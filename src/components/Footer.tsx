export default function Footer() {
  return (
    <footer className="text-center pb-[70px]">
        <div>
          Hosts:{" "}
          <a href="https://twitter.com/nayafia">
            Nadia Asparouhova
          </a>{" "}
          &{" "}
          <a href="https://twitter.com/left_pad">
            Henry Zhu
          </a>
        </div>
        <div>
          Cover Art: Jessica Han | Music:{" "}
          <a href="https://twitter.com/ken_wheeler">
            Ken Wheeler
          </a>
        </div>
        All rights reserved
        <div>
          Supported via{" "}
          <a 
            href="https://github.com/sponsors/hzoo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Sponsors
          </a>
        </div>
    </footer>
  );
}
