import { Button, Input } from "antd";
import Link from "antd/es/typography/Link";
import { useEffect } from "react";

const index = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "eng",
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  return (
    <nav className="z-50 sticky top-0 bg-white">
      <div className="grid grid-cols-2 sm:grid-cols-3 items-center sm:place-items-center p-2">
        <Link
          to="/"
          className="hidden sm:block text-4xl font-semibold"
          style={{ color: "rgb(30, 63, 134)" }}
        >
          adras
        </Link>
        <Link to="/" className="max-w-[50px]">
          <img src="/logo-icon.png" alt="Adras logo" />
        </Link>
        <div className="flex items-center gap-2">
          {/* <Input
            placeholder="Izlash"
            className="border border-secondary"
            suffix={
              <Button
                type="primary"
                className="bg-blue-500"
                icon={<span className="fa-solid fa-search" />}
              />
            }
          /> */}
          <div id="google_translate_element" className="border"></div>
        </div>
      </div>
    </nav>
  );
};

export default index;
