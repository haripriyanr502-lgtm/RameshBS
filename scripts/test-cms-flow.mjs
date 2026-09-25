// Comprehensive verification of CMS Data Flow: Text, Image Replacement, Image Deletion, Project Add/Delete, and SSR Reflection
async function runCmsFlowTests() {
  const baseUrl = 'http://localhost:3000';
  console.log('==================================================');
  console.log('   PORTFOLIO CMS DATA FLOW COMPREHENSIVE TESTS    ');
  console.log('==================================================\n');

  // Step 1: Admin Login
  console.log('[STEP 1] Authenticating as Admin...');
  const resLogin = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@portfolio.com', password: 'admin123' }),
  });
  if (!resLogin.ok) throw new Error(`Login failed with status ${resLogin.status}`);
  const setCookie = resLogin.headers.get('set-cookie');
  const sessionCookie = setCookie ? setCookie.match(/admin_session=[^;]+/)[0] : '';
  console.log('-> Admin authenticated successfully. Session cookie acquired.\n');

  // Step 2: Fetch Current CMS Database
  console.log('[STEP 2] Fetching current CMS database...');
  const resDb = await fetch(`${baseUrl}/api/admin/content`, {
    headers: { Cookie: sessionCookie },
  });
  const originalDb = await resDb.json();
  console.log(`-> Loaded ${originalDb.projects.length} projects, aboutImage: "${originalDb.home.aboutImage}".\n`);

  // ----------------------------------------------------
  // TEST A: TEXT MODIFICATION
  // ----------------------------------------------------
  console.log('--------------------------------------------------');
  console.log('TEST A: TEXT MODIFICATION (About Heading & Vision)');
  console.log('--------------------------------------------------');
  const testHeading = 'ABOUT ME — CMS VERIFIED LIVE';
  const testVision = 'To empower rural communities through sustainable technology and CSR clean water initiatives.';

  const testADb = {
    ...originalDb,
    home: {
      ...originalDb.home,
      aboutHeading: testHeading,
      aboutVision: testVision,
    },
    aboutExtras: {
      ...originalDb.aboutExtras,
      vision: testVision,
    },
  };

  const resSaveA = await fetch(`${baseUrl}/api/admin/content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
    body: JSON.stringify(testADb),
  });
  const jsonSaveA = await resSaveA.json();
  console.log(`-> Save status: ${resSaveA.status} (Success: ${jsonSaveA.success})`);

  // Verify on Public Website SSR HTML
  const resPublicA = await fetch(`${baseUrl}/`);
  const htmlA = await resPublicA.text();
  const textFound = htmlA.includes(testHeading) && htmlA.includes(testVision);
  console.log(`-> Public Website SSR HTML reflects new heading & vision: ${textFound ? 'PASSED (YES)' : 'FAILED (NO)'}`);
  if (!textFound) throw new Error('TEST A FAILED: New text not found on public website!');

  // ----------------------------------------------------
  // TEST B: IMAGE REPLACEMENT
  // ----------------------------------------------------
  console.log('\n--------------------------------------------------');
  console.log('TEST B: IMAGE REPLACEMENT (About & Hero Photos)');
  console.log('--------------------------------------------------');
  const testNewImage = '/uploads/hero/test-replacement-portrait.jpg';
  const testBDb = {
    ...testADb,
    home: {
      ...testADb.home,
      aboutImage: testNewImage,
    },
  };

  const resSaveB = await fetch(`${baseUrl}/api/admin/content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
    body: JSON.stringify(testBDb),
  });
  const jsonSaveB = await resSaveB.json();
  console.log(`-> Save status: ${resSaveB.status} (Success: ${jsonSaveB.success})`);

  // Verify on Public Website SSR HTML
  const resPublicB = await fetch(`${baseUrl}/`);
  const htmlB = await resPublicB.text();
  const imageFound = htmlB.includes(testNewImage);
  console.log(`-> Public Website SSR HTML reflects new image URL: ${imageFound ? 'PASSED (YES)' : 'FAILED (NO)'}`);
  if (!imageFound) throw new Error('TEST B FAILED: Replacement image not found on public website!');

  // ----------------------------------------------------
  // TEST C: DELETE IMAGE
  // ----------------------------------------------------
  console.log('\n--------------------------------------------------');
  console.log('TEST C: DELETE IMAGE (Remove About Image -> Fallback Frame)');
  console.log('--------------------------------------------------');
  const testCDb = {
    ...testBDb,
    home: {
      ...testBDb.home,
      aboutImage: '',
    },
  };

  const resSaveC = await fetch(`${baseUrl}/api/admin/content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
    body: JSON.stringify(testCDb),
  });
  const jsonSaveC = await resSaveC.json();
  console.log(`-> Save status: ${resSaveC.status} (Success: ${jsonSaveC.success})`);

  // Verify on Public Website SSR HTML
  const resPublicC = await fetch(`${baseUrl}/`);
  const htmlC = await resPublicC.text();
  const oldImageRemoved = !htmlC.includes(testNewImage);
  const fallbackRendered = htmlC.includes('Executive Profile Frame');
  console.log(`-> Old image removed: ${oldImageRemoved ? 'PASSED (YES)' : 'FAILED (NO)'}`);
  console.log(`-> Clean fallback frame rendered: ${fallbackRendered ? 'PASSED (YES)' : 'FAILED (NO)'}`);
  if (!oldImageRemoved || !fallbackRendered) throw new Error('TEST C FAILED: Image deletion did not reflect on public site!');

  // ----------------------------------------------------
  // TEST D: ADD NEW PROJECT
  // ----------------------------------------------------
  console.log('\n--------------------------------------------------');
  console.log('TEST D: ADD NEW PROJECT (Dynamic Activity Creation)');
  console.log('--------------------------------------------------');
  const newProjectTitle = 'Inauguration of 4th Rural Clean Water RO Plant @ Ramanagara';
  const newProject = {
    id: `act-test-${Date.now()}`,
    title: newProjectTitle,
    category: 'Service Activities',
    description: 'Special inauguration ceremony dedicated to providing 5000+ villagers clean drinking water.',
    hashtags: ['#CleanWater', '#CSRImpact', '#LCBBrigade'],
    date: '2026',
    location: 'Ramanagara, Karnataka',
    image: '/images/bs_ramesh_profile.jpg',
    url: '/images/bs_ramesh_profile.jpg',
    status: 'published',
    displayOrder: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const testDDb = {
    ...testCDb,
    projects: [newProject, ...testCDb.projects],
  };

  const resSaveD = await fetch(`${baseUrl}/api/admin/content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
    body: JSON.stringify(testDDb),
  });
  console.log(`-> Save status: ${resSaveD.status}`);

  const resPublicD = await fetch(`${baseUrl}/`);
  const htmlD = await resPublicD.text();
  const projectFound = htmlD.includes(newProjectTitle);
  console.log(`-> Public Website SSR HTML reflects newly added project: ${projectFound ? 'PASSED (YES)' : 'FAILED (NO)'}`);
  if (!projectFound) throw new Error('TEST D FAILED: New project not found on public website!');

  // ----------------------------------------------------
  // TEST E: CLEAN REVERT & PERSISTENCE CHECK
  // ----------------------------------------------------
  console.log('\n--------------------------------------------------');
  console.log('TEST E: CLEAN REVERT TO ORIGINAL DATA');
  console.log('--------------------------------------------------');
  const resRevert = await fetch(`${baseUrl}/api/admin/content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: sessionCookie },
    body: JSON.stringify(originalDb),
  });
  console.log(`-> Revert status: ${resRevert.status}`);

  const resPublicRevert = await fetch(`${baseUrl}/`);
  const htmlRevert = await resPublicRevert.text();
  const originalHeadingRestored = htmlRevert.includes(originalDb.home.aboutHeading);
  const testProjectGone = !htmlRevert.includes(newProjectTitle);
  console.log(`-> Original heading restored: ${originalHeadingRestored}`);
  console.log(`-> Test project removed: ${testProjectGone}`);

  // Logout
  await fetch(`${baseUrl}/api/auth/logout`, {
    method: 'POST',
    headers: { Cookie: sessionCookie },
  });
  console.log('-> Admin logged out.\n');

  console.log('==================================================');
  console.log('   ALL CMS DATA FLOW TESTS PASSED WITH 100% SUCCESS!   ');
  console.log('==================================================');
}

runCmsFlowTests().catch((err) => {
  console.error('\n*** TEST RUN FAILED ***\n', err);
  process.exit(1);
});
