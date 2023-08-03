/*!

=========================================================
* Paper Kit React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components

// core components
import IndexNavbar from "./../components/Navbars/IndexNavbar.js";
import IndexHeader from "./../components/Headers/IndexHeader.js";
import DemoFooter from "./../components/Footers/DemoFooter.js";

// index sections
import SectionButtons from "./index-sections/SectionButtons.js";
import SectionNavbars from "./index-sections/SectionNavbars.js";
import SectionNavigation from "./index-sections/SectionNavigation.js";
import SectionProgress from "./index-sections/SectionProgress.js";
import SectionNotifications from "./index-sections/SectionNotifications.js";
import SectionTypography from "./index-sections/SectionTypography.js";
import SectionJavaScript from "./index-sections/SectionJavaScript.js";
import SectionCarousel from "./index-sections/SectionCarousel.js";
import SectionNucleoIcons from "./index-sections/SectionNucleoIcons.js";
import SectionDark from "./index-sections/SectionDark.js";
import SectionLogin from "./index-sections/SectionLogin.js";
import SectionExamples from "./index-sections/SectionExamples.js";
import SectionDownload from "./index-sections/SectionDownload.js";

function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>
      <IndexNavbar />
      <IndexHeader />
      <div className="main">
        <SectionButtons />
        <SectionNavbars />
        <SectionNavigation />
        <SectionProgress />
        <SectionNotifications />
        <SectionTypography />
        <SectionJavaScript />
        <SectionCarousel />
        <SectionNucleoIcons />
        <SectionDark />
        <SectionLogin />
        <SectionExamples />
        <SectionDownload />
        <DemoFooter />
      </div>
    </>
  );
}

export default Index;
