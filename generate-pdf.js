const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'shell',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    // Add error handler for page errors
    page.on('error', err => {
      console.error('Page error:', err);
    });

    page.on('pageerror', err => {
      console.error('Page error:', err);
    });

    console.log('Loading resume page...');

    // Load the resume HTML file
    const filePath = 'file://' + path.join(__dirname, 'resume.html');
    await page.goto(filePath, {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    console.log('Page loaded successfully');

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simplify the layout for PDF - flatten all cards to plain text
  await page.evaluate(() => {
    // Remove navigation, footer, and download button
    const nav = document.querySelector('.main-nav');
    const navSpacer = document.querySelector('.nav-spacer');
    const footer = document.querySelector('footer');
    const downloadBtn = document.querySelector('a[download]');
    if (nav) nav.remove();
    if (navSpacer) navSpacer.remove();
    if (footer) footer.remove();
    if (downloadBtn) downloadBtn.remove();

    // Style LinkedIn and Portfolio links with consistent font size
    const linkedinLink = document.querySelector('a[href*="linkedin"]');
    const portfolioLink = document.querySelector('a[href*="index.html"]');

    if (linkedinLink) {
      linkedinLink.style.fontSize = '12px';
      linkedinLink.style.fontWeight = '400';
    }

    if (portfolioLink) {
      portfolioLink.style.fontSize = '12px';
      portfolioLink.style.fontWeight = '400';
    }

    // Keep the separator between LinkedIn and Portfolio
    // Style the separator
    const separators = document.querySelectorAll('span');
    separators.forEach(span => {
      if (span.textContent.includes('|')) {
        span.style.fontSize = '12px';
      }
    });

    // Force all content to be visible
    document.querySelectorAll('*').forEach(el => {
      if (el.style.display === 'none') el.style.display = 'block';
      if (el.style.visibility === 'hidden') el.style.visibility = 'visible';
      if (el.style.opacity === '0') el.style.opacity = '1';
    });

    // Make pdf-only elements visible in PDF (override !important from CSS)
    document.querySelectorAll('.pdf-only').forEach(el => {
      // Use inline for a/span elements, block for divs
      if (el.tagName === 'A' || el.tagName === 'SPAN') {
        el.style.setProperty('display', 'inline', 'important');
      } else {
        el.style.setProperty('display', 'flex', 'important');
      }
      el.style.setProperty('visibility', 'visible', 'important');
      el.style.setProperty('opacity', '1', 'important');
    });

    // Remove all card backgrounds and borders
    const allCards = document.querySelectorAll('.timeline-dashboard-item, .dashboard-card, .cta-card, .education-card');
    allCards.forEach(card => {
      card.style.background = 'transparent';
      card.style.border = 'none';
      card.style.boxShadow = 'none';
      card.style.padding = '0';
      card.style.marginBottom = '12px';
      card.style.pageBreakInside = 'auto';
      card.style.pageBreakAfter = 'auto';
      card.style.pageBreakBefore = 'auto';
      card.style.display = 'block';
      card.style.visibility = 'visible';
      card.style.opacity = '1';
    });

    // Add slightly more spacing between job roles
    const jobRoles = document.querySelectorAll('.timeline-dashboard-item');
    jobRoles.forEach(role => {
      role.style.marginBottom = '16px';
      role.style.paddingBottom = '4px';
    });

    // Flatten cta-card-content inside competency cards
    const ctaCardContent = document.querySelectorAll('.cta-card-content');
    ctaCardContent.forEach(content => {
      content.style.padding = '0';
      content.style.display = 'block';
    });

    // Simplify all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.background = 'white';
      section.style.padding = '2px 0';
      section.style.marginTop = '0';
      section.style.marginBottom = '0';
      section.style.display = 'block';
      section.style.visibility = 'visible';
      section.style.pageBreakInside = 'auto';
      section.style.pageBreakAfter = 'auto';
      section.style.pageBreakBefore = 'auto';
    });

    // Make stats horizontal and align to the left
    const statsContainers = document.querySelectorAll('.hero-stats-plain');
    statsContainers.forEach(container => {
      container.style.display = 'flex';
      container.style.flexDirection = 'row';
      container.style.justifyContent = 'flex-start';
      container.style.gap = '20px';
      container.style.marginBottom = '16px';
      container.style.flexWrap = 'nowrap';
    });

    // Ensure individual stat items stay horizontal and left-aligned
    const statItems = document.querySelectorAll('.hero-stats-plain .stat');
    statItems.forEach(stat => {
      stat.style.display = 'flex';
      stat.style.flexDirection = 'column';
      stat.style.alignItems = 'flex-start';
      stat.style.textAlign = 'left';
      stat.style.minWidth = '80px';
    });

    // Remove background colors from highlight boxes
    const highlightBoxes = document.querySelectorAll('[style*="background"]');
    highlightBoxes.forEach(box => {
      if (box.style.background && box.style.background.includes('rgba')) {
        box.style.background = 'transparent';
        box.style.border = '1px solid #ddd';
        box.style.padding = '6px';
        box.style.marginTop = '8px';
      }
    });

    // Reduce spacing in job items
    const jobItems = document.querySelectorAll('.timeline-dashboard-item > div');
    jobItems.forEach(div => {
      if (div.style.marginBottom) {
        div.style.marginBottom = '8px';
      }
    });

    // Remove page breaks from timeline container
    const timelineDashboard = document.querySelectorAll('.timeline-dashboard');
    timelineDashboard.forEach(container => {
      container.style.pageBreakInside = 'auto';
    });

    // Simplify competencies and education grid layouts
    const grids = document.querySelectorAll('[style*="grid-template-columns"]');
    grids.forEach(grid => {
      grid.style.gap = '6px';
      grid.style.marginTop = '6px';
      grid.style.marginBottom = '6px';
    });

    // Reduce spacing in containers
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
      container.style.paddingTop = '2px';
      container.style.paddingBottom = '2px';
    });

    // Remove badges or simplify them
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
      badge.style.background = 'transparent';
      badge.style.border = '1px solid #333';
      badge.style.color = '#333';
      badge.style.padding = '2px 8px';
      badge.style.fontSize = '10px';
    });

    // Reduce font sizes for better fit
    document.querySelectorAll('h1').forEach(h => {
      h.style.fontSize = '24px';
      h.style.marginTop = '5px';
      h.style.marginBottom = '8px';
      h.style.pageBreakAfter = 'avoid';
    });
    document.querySelectorAll('h2').forEach(h => {
      h.style.fontSize = '18px';
      h.style.marginTop = '8px';
      h.style.marginBottom = '8px';
      h.style.pageBreakAfter = 'avoid';
    });
    document.querySelectorAll('h3').forEach(h => {
      h.style.fontSize = '14px';
      h.style.display = 'block';
      h.style.visibility = 'visible';
      h.style.pageBreakAfter = 'avoid';
      h.style.marginTop = '4px';
      h.style.marginBottom = '4px';
    });
    document.querySelectorAll('h4').forEach(h => {
      h.style.fontSize = '12px';
      h.style.pageBreakAfter = 'avoid';
    });
    document.querySelectorAll('p, li').forEach(el => {
      if (el.style.fontSize && parseInt(el.style.fontSize) > 12) {
        el.style.fontSize = '11px';
      }
      if (!el.style.fontSize) {
        el.style.fontSize = '11px';
      }
      el.style.lineHeight = '1.4';
      el.style.display = 'block';
      el.style.visibility = 'visible';
      el.style.pageBreakInside = 'avoid';
      el.style.marginTop = '2px';
      el.style.marginBottom = '2px';
    });

    // Reduce stat numbers
    document.querySelectorAll('.stat-number').forEach(el => el.style.fontSize = '20px');
    document.querySelectorAll('.stat-label').forEach(el => el.style.fontSize = '10px');

    // Ensure all job achievements lists are visible
    document.querySelectorAll('.job-achievements').forEach(ul => {
      ul.style.display = 'block';
      ul.style.visibility = 'visible';
      ul.style.opacity = '1';
      ul.style.marginTop = '4px';
      ul.style.marginBottom = '4px';
    });

    // Prevent list items from breaking across pages
    document.querySelectorAll('.job-achievements li').forEach(li => {
      li.style.pageBreakInside = 'avoid';
      li.style.marginBottom = '4px';
    });
  });

  // Generate PDF
  await page.pdf({
    path: 'Iryna_Bykova_Resume.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '12mm',
      right: '15mm',
      bottom: '12mm',
      left: '15mm'
    }
  });

  console.log('PDF generated successfully: Iryna_Bykova_Resume.pdf');

  await browser.close();
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
})();
