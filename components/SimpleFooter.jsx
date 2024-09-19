import FooterLink from "./FooterLink";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 z-50 h-9 w-screen bg-pwprimary-100 font-pally">
      <hr style={{ borderTop: "1px solid #acb5bd" }} />
      <div className="grid grid-col-4 text-sm w-full">
        <span className="col-start-1 pl-4">
          <FooterLink text={"Pricewards"} path={"/"} /> Ⓒ 2022
        </span>
        <span className="flex gap-8 col-end-13">
          <FooterLink text={"Terms"} path={"#"} />
          <FooterLink text={"Privacy"} path={"#"} />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
