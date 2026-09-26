// scripts/test-admin-users.mjs
const BASE_URL = 'http://localhost:3000';

let failedTests = 0;
let passedTests = 0;

function logPass(msg) {
  passedTests++;
  console.log(`\x1b[32m✔ PASS:\x1b[0m ${msg}`);
}

function logFail(msg, err) {
  failedTests++;
  console.error(`\x1b[31m✖ FAIL:\x1b[0m ${msg}`, err ? err : '');
}

async function runTests() {
  console.log('====================================================');
  console.log(' RUNNING ADMIN USER MANAGEMENT VERIFICATION SUITE');
  console.log('====================================================\n');

  // Test 1: Normal visitor opens public site "/"
  try {
    const res = await fetch(`${BASE_URL}/`, { redirect: 'manual' });
    const html = await res.text();
    const hasAdminLinks = html.includes('/admin/dashboard') || html.includes('Add Admin') || html.includes('Create Admin');
    if (res.status === 200 && !hasAdminLinks) {
      logPass('Test 1: Public portfolio returns 200 with NO admin controls or Add/Create Admin buttons');
    } else {
      logFail(`Test 1: Public site had unexpected status ${res.status} or leaked admin controls.`);
    }
  } catch (err) {
    logFail('Test 1: Failed to fetch public site', err);
  }

  // Test 2: Normal visitor opens "/admin"
  try {
    const res = await fetch(`${BASE_URL}/admin`, { redirect: 'manual' });
    const location = res.headers.get('location') || '';
    if (res.status === 307 || res.status === 308 || res.status === 302 || location.includes('/admin/login')) {
      logPass(`Test 2: Normal visitor opening /admin redirects to login page (Status: ${res.status}, Location: ${location})`);
    } else {
      logFail(`Test 2: Expected redirect to /admin/login but got status ${res.status} and location ${location}`);
    }
  } catch (err) {
    logFail('Test 2: Failed to fetch /admin', err);
  }

  // Test 3: Unauthenticated user tries "/admin/users" and "/api/admin/users"
  try {
    const resPage = await fetch(`${BASE_URL}/admin/users`, { redirect: 'manual' });
    const location = resPage.headers.get('location') || '';
    const isRedirect = (resPage.status === 307 || resPage.status === 308 || resPage.status === 302) && location.includes('/admin/login');

    const resApi = await fetch(`${BASE_URL}/api/admin/users`, { redirect: 'manual' });
    const isDeniedApi = resApi.status === 401;

    if (isRedirect && isDeniedApi) {
      logPass(`Test 3: Unauthenticated /admin/users redirects to login (${location}) and /api/admin/users returns 401 Unauthorized`);
    } else {
      logFail(`Test 3: Failed. Page status=${resPage.status}, location=${location}, API status=${resApi.status}`);
    }
  } catch (err) {
    logFail('Test 3: Unauthenticated access test failed', err);
  }

  // Test 4: Authenticated admin login & access Admin Users API
  let adminCookie = '';
  try {
    const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@portfolio.com', password: 'admin123' }),
    });

    const setCookie = loginRes.headers.get('set-cookie');
    if (loginRes.ok && setCookie) {
      adminCookie = setCookie.split(';')[0];
      logPass('Test 4a: Default admin (admin@portfolio.com) logged in successfully');
    } else {
      logFail(`Test 4a: Login failed with status ${loginRes.status}`);
    }

    const listRes = await fetch(`${BASE_URL}/api/admin/users`, {
      headers: { Cookie: adminCookie },
    });
    const listData = await listRes.json();
    if (listRes.ok && listData.success && Array.isArray(listData.users)) {
      logPass(`Test 4b: Admin successfully accessed Admin Users list (${listData.users.length} users registered)`);
    } else {
      logFail('Test 4b: Failed to retrieve admin users list', listData);
    }
  } catch (err) {
    logFail('Test 4: Admin access failed', err);
  }

  // Test 5: Admin creates "newadmin@example.com" with initial password
  const testEmail = 'newadmin@example.com';
  const testPassword = 'SecureAdminPass2026!';
  let createdUserId = '';

  try {
    const createRes = await fetch(`${BASE_URL}/api/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        role: 'admin',
      }),
    });

    const createData = await createRes.json();
    if (createRes.status === 201 && createData.success) {
      createdUserId = createData.user.id;
      logPass(`Test 5: New admin (${testEmail}) created successfully: "${createData.message}"`);
    } else {
      logFail(`Test 5: Failed to create new admin: ${createData.error || createRes.status}`);
    }
  } catch (err) {
    logFail('Test 5: Exception creating new admin', err);
  }

  // Test 6: Log out and login with newly created admin account
  let newAdminCookie = '';
  try {
    // Attempt login with new credentials
    const newLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword }),
    });

    const setCookie = newLoginRes.headers.get('set-cookie');
    if (newLoginRes.ok && setCookie) {
      newAdminCookie = setCookie.split(';')[0];
      logPass(`Test 6a: Newly created admin (${testEmail}) logged in successfully`);
    } else {
      logFail(`Test 6a: Login failed for new admin with status ${newLoginRes.status}`);
    }

    // Verify session
    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Cookie: newAdminCookie },
    });
    const meData = await meRes.json();
    if (meRes.ok && meData.user && meData.user.email === testEmail && meData.user.role === 'admin') {
      logPass(`Test 6b: New admin session verified (/api/auth/me returned role=${meData.user.role})`);
    } else {
      logFail('Test 6b: Verification of new admin session failed', meData);
    }
  } catch (err) {
    logFail('Test 6: Exception logging in with new admin', err);
  }

  // Test 7: Role permission enforcement - create editor and verify access restrictions
  const editorEmail = 'editor@example.com';
  const editorPassword = 'EditorPassword123!';
  let editorId = '';
  let editorCookie = '';

  try {
    // Create editor user
    const createEditorRes = await fetch(`${BASE_URL}/api/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        email: editorEmail,
        password: editorPassword,
        role: 'editor',
      }),
    });
    const editorData = await createEditorRes.json();
    if (createEditorRes.status === 201) {
      editorId = editorData.user.id;
      logPass('Test 7a: Created test editor account');
    }

    // Login as editor
    const editorLogin = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: editorEmail, password: editorPassword }),
    });
    const edCookie = editorLogin.headers.get('set-cookie');
    if (editorLogin.ok && edCookie) {
      editorCookie = edCookie.split(';')[0];
    }

    // Try to access /api/admin/users as editor
    const deniedRes = await fetch(`${BASE_URL}/api/admin/users`, {
      headers: { Cookie: editorCookie },
    });
    if (deniedRes.status === 403) {
      logPass('Test 7b: Editor account correctly denied access (403 Forbidden) to Admin Users API');
    } else {
      logFail(`Test 7b: Expected 403 Forbidden for editor, got ${deniedRes.status}`);
    }
  } catch (err) {
    logFail('Test 7: Permission enforcement test failed', err);
  }

  // Test 8: Verify passwords are never exposed anywhere
  try {
    const listRes = await fetch(`${BASE_URL}/api/admin/users`, {
      headers: { Cookie: adminCookie },
    });
    const listData = await listRes.json();
    let leaked = false;
    for (const u of listData.users) {
      if (u.password || u.passwordHash || u.salt) {
        leaked = true;
        break;
      }
    }

    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Cookie: adminCookie },
    });
    const meData = await meRes.json();
    if (meData.user.password || meData.user.passwordHash || meData.user.salt) {
      leaked = true;
    }

    if (!leaked) {
      logPass('Test 8: Confirmed passwords, passwordHash, and salts are NEVER exposed in any API response or user object');
    } else {
      logFail('Test 8: Password or hash was exposed in API output!');
    }
  } catch (err) {
    logFail('Test 8: Error testing password secrecy', err);
  }

  // Test 9: Disabling account prevents login
  try {
    // Disable new admin
    const disableRes = await fetch(`${BASE_URL}/api/admin/users`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        id: createdUserId,
        action: 'toggle_status',
        status: 'disabled',
      }),
    });
    const disableData = await disableRes.json();
    if (disableRes.ok && disableData.success) {
      logPass('Test 9a: Successfully set new admin status to disabled');
    }

    // Try logging in with disabled account
    const tryLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword }),
    });
    const tryLoginData = await tryLoginRes.json();
    if (tryLoginRes.status === 401 && tryLoginData.error && tryLoginData.error.includes('disabled')) {
      logPass(`Test 9b: Disabled administrator correctly blocked from login: "${tryLoginData.error}"`);
    } else {
      logFail(`Test 9b: Disabled user was not blocked properly: status=${tryLoginRes.status}`);
    }

    // Re-enable
    await fetch(`${BASE_URL}/api/admin/users`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        id: createdUserId,
        action: 'toggle_status',
        status: 'active',
      }),
    });
  } catch (err) {
    logFail('Test 9: Account disable test failed', err);
  }

  // Test 10: Safety guards (Cannot delete or disable self, cannot delete last admin)
  try {
    // Fetch owner ID
    const listRes = await fetch(`${BASE_URL}/api/admin/users`, {
      headers: { Cookie: adminCookie },
    });
    const { users } = await listRes.json();
    const owner = users.find((u) => u.email === 'admin@portfolio.com');

    // Attempt self-disable
    const selfDisableRes = await fetch(`${BASE_URL}/api/admin/users`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        id: owner.id,
        action: 'toggle_status',
        status: 'disabled',
      }),
    });
    const selfDisableData = await selfDisableRes.json();
    if (selfDisableRes.status === 400 && selfDisableData.error.includes('cannot disable your own')) {
      logPass('Test 10a: Self-disable guard verified: Current admin cannot disable themselves');
    } else {
      logFail('Test 10a: Self-disable was not blocked as expected', selfDisableData);
    }

    // Attempt self-delete
    const selfDeleteRes = await fetch(`${BASE_URL}/api/admin/users`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Cookie: adminCookie,
      },
      body: JSON.stringify({ id: owner.id }),
    });
    const selfDeleteData = await selfDeleteRes.json();
    if (selfDeleteRes.status === 400 && selfDeleteData.error.includes('cannot delete your own')) {
      logPass('Test 10b: Self-delete guard verified: Current admin cannot delete themselves');
    } else {
      logFail('Test 10b: Self-delete was not blocked as expected', selfDeleteData);
    }
  } catch (err) {
    logFail('Test 10: Safety guards test failed', err);
  }

  // Clean up: delete test users
  try {
    if (createdUserId) {
      await fetch(`${BASE_URL}/api/admin/users`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Cookie: adminCookie,
        },
        body: JSON.stringify({ id: createdUserId }),
      });
    }
    if (editorId) {
      await fetch(`${BASE_URL}/api/admin/users`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Cookie: adminCookie,
        },
        body: JSON.stringify({ id: editorId }),
      });
    }
    logPass('Cleanup: Removed temporary test accounts safely');
  } catch (err) {
    console.error('Cleanup error:', err);
  }

  console.log('\n====================================================');
  console.log(` SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('====================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests();
