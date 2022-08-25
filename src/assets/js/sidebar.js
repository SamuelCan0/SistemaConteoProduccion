angular.module('ConteoProductos', [])
/*var body=angular.element(document).find("body"),
      sidebar=body.querySelector(".sidebar"),
      toggle=body.querySelector(".toggle"),
      searchBtn=body.querySelector(".search-box"),
      modeSwitch=body.querySelector(".toggle-switch"),
      modeText=body.querySelector(".mode-text");*/
      sectionId=".toggle-switch";
      var modeSwitch = document.querySelector(".");
      console.log(modeSwitch);

      modeSwitch?.addEventListener("click",()=>{
        body.classList.toggle("dark");
      });
