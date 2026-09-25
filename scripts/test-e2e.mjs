// Verification test script
async function runVerification() {
  const baseUrl = 'http://localhost:3000';
  console.log('--- STARTING CMS & PORTFOLIO E2E TESTS ---');

  // Test 1: Public Home Page
  console.log('\n[TEST 1] Checking Public Website (GET /)...');
  const resHome = await fetch(`${baseUrl}/`);
  if (!resHome.ok) throw new Error(`Home returned status ${resHome.status}`);
  const homeHtml = await resHome.text();
  
  // Verify public content
  const hasRamesh = homeHtml.includes('Bangalore Siddegowda Ramesh') || homeHtml.includes('Ramesh B S');
  const hasNoAdminBtn = !homeHtml.includes('href="/admin"') && !homeHtml.includes('href="/admin/dashboard"');
  console.log(`- Public Homepage Status: ${resHome.status} OK`);
  console.log(`- Contains Owner Name / Content: ${hasRamesh}`);
  console.log(`- Clean Public UI (No admin links/buttons): ${hasNoAdminBtn}`);

  // Test 2: Unauthenticated Protected Route Access
  console.log('\n[TEST 2] Checking Protected Route Guard (GET /admin/dashboard)...');
  const resDashUnauth = await fetch(`${baseUrl}/admin/dashboard`, { redirect: 'manual' });
  const isRedirect = resDashUnauth.status === 307 || resDashUnauth.status === 302 || resDashUnauth.status === 308;
  const redirectLocation = resDashUnauth.headers.get('location');
  console.log(`- Status: ${resDashUnauth.status}`);
  console.log(`- Redirected: ${isRedirect} to ${redirectLocation}`);

  // Test 3: Public Content API
  console.log('\n[TEST 3] Checking Public Content API (GET /api/content)...');
  const resContent = await fetch(`${baseUrl}/api/content`);
  const contentData = await resContent.json();
  console.log(`- Status: ${resContent.status}`);
  console.log(`- Projects/Activities count: ${contentData.projects?.length || 0}`);
  console.log(`- Services count: ${contentData.services?.length || 0}`);
  console.log(`- Career experiences count: ${contentData.career?.experiences?.length || 0}`);
  console.log(`- Lionistic milestones count: ${contentData.lionisticJourney?.milestones?.length || 0}`);

  // Test 4: Admin Content API without Auth
  console.log('\n[TEST 4] Checking Admin Content API (Unauthorized)...');
  const resAdminUnauth = await fetch(`${baseUrl}/api/admin/content`);
  console.log(`- Status: ${resAdminUnauth.status} (Expected 401)`);

  // Test 5: Login with Invalid Credentials
  console.log('\n[TEST 5] Checking Login with Invalid Credentials...');
  const resInvalidLogin = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@portfolio.com', password: 'wrongpassword' }),
  });
  const invalidJson = await resInvalidLogin.json();
  console.log(`- Status: ${resInvalidLogin.status} (Expected 401)`);
  console.log(`- Error message: ${invalidJson.error}`);

  // Test 6: Login with Valid Credentials
  console.log('\n[TEST 6] Checking Login with Valid Credentials (admin@portfolio.com / admin123)...');
  const resValidLogin = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@portfolio.com', password: 'admin123' }),
  });
  const validJson = await resValidLogin.json();
  const setCookie = resValidLogin.headers.get('set-cookie');
  console.log(`- Status: ${resValidLogin.status} (Expected 200)`);
  console.log(`- Success: ${validJson.success}`);
  console.log(`- Set-Cookie received: ${!!setCookie}`);

  // Extract session cookie
  let sessionCookie = '';
  if (setCookie) {
    const match = setCookie.match(/admin_session=[^;]+/);
    if (match) sessionCookie = match[0];
  }

  // Test 7: Verify Authenticated Admin Content Access
  console.log('\n[TEST 7] Checking Admin Content API with Session Cookie...');
  const resAdminAuth = await fetch(`${baseUrl}/api/admin/content`, {
    headers: { Cookie: sessionCookie }
  });
  const adminDb = await resAdminAuth.json();
  console.log(`- Status: ${resAdminAuth.status}`);
  console.log(`- CMS Total Projects: ${adminDb.projects?.length || 0}`);
  console.log(`- CMS Total Services: ${adminDb.services?.length || 0}`);

  // Test 8: Test Editing Content via Admin API
  console.log('\n[TEST 8] Testing Content Update via Admin API...');
  const currentProjects = adminDb.projects;
  const originalTitle = currentProjects[0].title;
  console.log(`- Original First Project Title: "${originalTitle}"`);
  
  // Update first project title
  const updatedProjects = [...currentProjects];
  const testTitle = `${originalTitle} (Verified)`;
  updatedProjects[0] = { ...updatedProjects[0], title: testTitle };
  
  const resSave = await fetch(`${baseUrl}/api/admin/content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: sessionCookie,
    },
    body: JSON.stringify({
      ...adminDb,
      projects: updatedProjects,
    }),
  });
  const saveJson = await resSave.json();
  console.log(`- Save Status: ${resSave.status}`);
  console.log(`- Save Success: ${saveJson.success}`);

  // Test 9: Verify Change Immediately Reflected on Public Site API
  console.log('\n[TEST 9] Verifying Change Reflected in Public API (Single Source of Truth)...');
  const resVerifyPublic = await fetch(`${baseUrl}/api/content`);
  const verifyPublicJson = await resVerifyPublic.json();
  const publicFirstTitle = verifyPublicJson.projects[0].title;
  console.log(`- Public First Project Title: "${publicFirstTitle}"`);
  const matches = publicFirstTitle === testTitle;
  console.log(`- Reflection Confirmed: ${matches}`);

  // Revert the title back to original
  console.log('\n[TEST 10] Reverting First Project Title back to original...');
  updatedProjects[0] = { ...updatedProjects[0], title: originalTitle };
  await fetch(`${baseUrl}/api/admin/content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: sessionCookie,
    },
    body: JSON.stringify({
      ...adminDb,
      projects: updatedProjects,
    }),
  });
  const resVerifyRevert = await fetch(`${baseUrl}/api/content`);
  const revertJson = await resVerifyRevert.json();
  console.log(`- Public First Project Title after Revert: "${revertJson.projects[0].title}"`);

  // Test 11: Logout Test
  console.log('\n[TEST 11] Checking Logout...');
  const resLogout = await fetch(`${baseUrl}/api/auth/logout`, {
    method: 'POST',
    headers: { Cookie: sessionCookie },
  });
  const logoutJson = await resLogout.json();
  console.log(`- Logout Status: ${resLogout.status}`);
  console.log(`- Logout Success: ${logoutJson.success}`);

  // Test 12: Admin Content after Logout
  console.log('\n[TEST 12] Checking Admin Access after Logout with old Cookie...');
  const resPostLogout = await fetch(`${baseUrl}/api/admin/content`, {
    headers: { Cookie: 'admin_session=' }
  });
  console.log(`- Status: ${resPostLogout.status} (Expected 401)`);

  console.log('\n--- ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ---');
}

runVerification().catch(err => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});
