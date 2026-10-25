/* Kashka Octora — archive portfolio. Plain JavaScript, no dependencies. */
(() => {
    'use strict';

    const root = document.documentElement;
    root.classList.add('reveal-ready');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/<>+*';

    /* Scramble a text node into its final value, left to right ------------ */
    function scramble(el, finalText, duration, done) {
        if (reduce) { el.textContent = finalText; if (done) done(); return; }
        const chars = Array.from(finalText);
        const start = performance.now();
        const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            const settled = Math.floor(p * chars.length);
            el.textContent = chars
                .map((c, i) => (c === ' ' || i < settled) ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
                .join('');
            if (p < 1) requestAnimationFrame(tick);
            else { el.textContent = finalText; if (done) done(); }
        };
        requestAnimationFrame(tick);
    }

    /* Reading progress ----------------------------------------------------- */
    const bar = document.getElementById('progress-bar');
    function updateProgress() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        if (bar) bar.style.transform = 'scaleX(' + p + ')';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();

    /* Mobile index menu ---------------------------------------------------- */
    const header = document.getElementById('site-header');
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('index');
    function setMenu(open) {
        if (!menuBtn) return;
        menuBtn.setAttribute('aria-expanded', String(open));
        header.classList.toggle('menu-open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }
    if (menuBtn) {
        menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
        nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
        window.matchMedia('(min-width: 761px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
    }

    /* Copy email ----------------------------------------------------------- */
    const copyBtn = document.getElementById('copy-email');
    if (copyBtn) {
        copyBtn.hidden = false;
        const label = copyBtn.querySelector('.btn-label');
        const status = document.getElementById('copy-status');
        const idle = label.textContent;
        let timer;

        async function copyText(text) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (_) { /* fall back to the legacy path */ }

            const area = document.createElement('textarea');
            area.value = text;
            area.setAttribute('readonly', '');
            area.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
            document.body.appendChild(area);
            area.select();
            let ok = false;
            try { ok = document.execCommand('copy'); } catch (_) { /* ignore */ }
            area.remove();
            return ok;
        }

        copyBtn.addEventListener('click', async () => {
            const ok = await copyText(copyBtn.dataset.email);
            label.textContent = ok ? 'COPIED' : 'COPY FAILED';
            status.textContent = ok ? 'Email address copied' : 'Could not copy the email address';
            copyBtn.dataset.state = ok ? 'done' : 'error';
            clearTimeout(timer);
            timer = setTimeout(() => {
                label.textContent = idle;
                status.textContent = '';
                copyBtn.removeAttribute('data-state');
            }, 1800);
        });
    }

    /* Page effects: reveal, decrypt headings, active index link ------------ */
    let started = false;
    function startPage() {
        if (started) return;
        started = true;

        const hasIO = 'IntersectionObserver' in window;

        // Reveal on scroll
        const reveals = document.querySelectorAll('.reveal');
        if (hasIO) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((en) => {
                    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
            reveals.forEach((el) => io.observe(el));
        } else {
            reveals.forEach((el) => el.classList.add('in'));
        }

        // Decrypt effect on section labels
        const decrypts = document.querySelectorAll('[data-decrypt]');
        decrypts.forEach((el) => { el.dataset.text = el.textContent.trim(); });
        if (hasIO) {
            const dio = new IntersectionObserver((entries) => {
                entries.forEach((en) => {
                    if (!en.isIntersecting) return;
                    const el = en.target;
                    dio.unobserve(el);
                    el.setAttribute('aria-label', el.dataset.text);
                    scramble(el, el.dataset.text, 800);
                });
            }, { threshold: 1 });
            decrypts.forEach((el) => dio.observe(el));
        }

        // Highlight the index link of the section in view
        const links = Array.from(document.querySelectorAll('#index a'));
        const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
        if (hasIO) {
            const sio = new IntersectionObserver((entries) => {
                entries.forEach((en) => {
                    const link = map.get(en.target.id);
                    if (!link) return;
                    if (en.isIntersecting) {
                        links.forEach((a) => a.removeAttribute('aria-current'));
                        link.setAttribute('aria-current', 'true');
                    } else {
                        link.removeAttribute('aria-current');
                    }
                });
            }, { rootMargin: '-45% 0px -50% 0px' });
            map.forEach((_, id) => { const s = document.getElementById(id); if (s) sio.observe(s); });
        }
    }

    /* Intro ---------------------------------------------------------------- */
    const intro = document.getElementById('intro');
    if (root.classList.contains('intro-on') && intro) {
        const count = document.getElementById('intro-count');
        const fill = document.getElementById('intro-fill');
        const line = document.getElementById('intro-line');
        const word = document.getElementById('intro-word');
        const steps = ['OPENING RECORD', 'DECRYPTING PROFILE', 'LOADING WORKS', 'ACCESS GRANTED'];
        const TOTAL = 2200;
        const t0 = performance.now();
        let finished = false;
        let stepIdx = -1;

        scramble(word, 'Kashka', 900);

        function finish() {
            if (finished) return;
            finished = true;
            try { sessionStorage.setItem('ko-intro', '1'); } catch (_) { /* ignore */ }
            count.textContent = '100';
            fill.style.transform = 'scaleX(1)';
            intro.classList.add('is-out');
            root.classList.remove('intro-on');
            startPage();
            setTimeout(() => { intro.remove(); }, 1000);
        }

        function frame(now) {
            if (finished) return;
            const p = Math.min(1, (now - t0) / TOTAL);
            const eased = 1 - Math.pow(1 - p, 2.2);
            count.textContent = String(Math.round(eased * 100)).padStart(3, '0');
            fill.style.transform = 'scaleX(' + eased + ')';
            const idx = Math.min(steps.length - 1, Math.floor(p * steps.length));
            if (idx !== stepIdx) { stepIdx = idx; scramble(line, steps[idx], 350); }
            if (p < 1) requestAnimationFrame(frame);
            else setTimeout(finish, 250);
        }
        requestAnimationFrame(frame);

        intro.addEventListener('click', finish);
        window.addEventListener('keydown', finish, { once: true });
        window.addEventListener('touchstart', finish, { once: true, passive: true });
    } else {
        if (intro) intro.remove();
        startPage();
    }
})();
