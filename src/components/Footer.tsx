import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-inner">
          <div>
            <h4>Index</h4>
            <ul>
              <li><Link href="/writing">Writing</Link></li>
              <li><Link href="/projects">Work</Link></li>
              <li><Link href="/speaking">Speaking</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/now">Now</Link></li>
              <li><Link href="/subscribe">Subscribe</Link></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><a href="mailto:jason@jcapshaw.com">Email</a></li>
              <li>
                <a
                  href="https://linkedin.com/in/jasoncapshaw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li><a href="/rss.xml" type="application/rss+xml">RSS</a></li>
              <li><a href="/atom.xml" type="application/atom+xml">Atom</a></li>
              <li><a href="/feed.json" type="application/feed+json">JSON Feed</a></li>
            </ul>
          </div>
          <div>
            <h4>Colophon</h4>
            <p>
              Set in Spectral and JetBrains Mono. Typography-forward, written
              and built by Jason Capshaw.
            </p>
          </div>
        </div>
        <div className="colophon">
          <span>© {new Date().getFullYear()} Jason Capshaw</span>
          <span>jcapshaw.com / v2</span>
        </div>
      </div>
    </footer>
  );
}
