export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
      }}
    >
      <div>
        Hosts: <a href="https://twitter.com/nayafia">Nadia Asparouhova</a> &{" "}
        <a href="https://twitter.com/left_pad">Henry Zhu</a>
      </div>
      <div>
        Cover Art: Jessica Han | Music:{" "}
        <a href="https://twitter.com/ken_wheeler">Ken Wheeler</a>
      </div>
      <a
        style={{
          boxShadow: "none",
          textDecoration: "none",
          color: "inherit",
        }}
        href={"/"}
      >
        All rights reserved
      </a>
      <br />
      <div>
        Donate on <a href="https://github.com/sponsors/hzoo">GitHub Sponsors</a>
      </div>
    </footer>
  );
}
