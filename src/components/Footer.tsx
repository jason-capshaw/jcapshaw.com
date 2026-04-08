export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__position">
          Systems thinking for B2B distribution. Writing on commerce
          architecture, enterprise systems, product data, and applied AI.
        </p>
        <ul className="site-footer__connect">
          <li>
            <a href="mailto:jason@jcapshaw.com">Email</a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/jasoncapshaw"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href="/rss.xml" type="application/rss+xml">RSS</a>
          </li>
        </ul>
      </div>
      <p className="site-footer__copy">
        &copy; {new Date().getFullYear()} Jason Capshaw
      </p>
    </footer>
  );
}
