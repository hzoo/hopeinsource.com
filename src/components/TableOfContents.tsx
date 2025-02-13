import { useEffect } from 'react';

interface TOCHeading {
  slug: string;
  text: string;
}

interface TableOfContentsProps {
  headings: TOCHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  useEffect(() => {
    let currentActiveLink: HTMLElement | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const correspondingLink = document.querySelector(
              `.toc-link[data-heading-id="${id}"]`
            ) as HTMLElement;

            if (currentActiveLink) {
              currentActiveLink.classList.remove('active');
            }

            if (correspondingLink) {
              correspondingLink.classList.add('active');
              currentActiveLink = correspondingLink;
            }
          }
        }
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );

    const headingElements = document.querySelectorAll('h4');
    for (const heading of headingElements) {
      observer.observe(heading);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!headings.length) return null;

  return (
    <nav className="toc">
      <ul>
        {headings.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              className="toc-link"
              data-heading-id={heading.slug}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 