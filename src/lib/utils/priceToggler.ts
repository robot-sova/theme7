
function animateCounter(element: HTMLElement, endValue: number) {
    let startValue = 0;
    const duration = 350;
    let startTime: number | null = null;

    function step(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      const value =
        Math.min(progress / duration, 1) * (endValue - startValue) +
        startValue;
      element.innerHTML = Math.ceil(value).toString();
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }
  
export const priceTogglerInit = () => {
    const billSwitch = document.getElementById("pricing-switch");
    const monthlyText: any = document.getElementById("monthly");
    const yearlyText: any = document.getElementById("yearly");
    const monthlyPrices: any = document.querySelector("#monthly-card-container");
    const yearlyPrices: any = document.querySelector("#yearly-card-container");

    function togglePricing(e: any) {
      // check if the switch is checked
      let isYearly = e.target.checked;
      if (isYearly) {
        // Switch to yearly
        monthlyText.style.color = "#9ea3bf";
        yearlyText.style.color = "#ffffff";
        monthlyPrices.style.display = "none";
        yearlyPrices.style.display = "block";

        // animate counter
        const numbers = document.querySelectorAll<HTMLDivElement>(".data-count");
        numbers.forEach(function (number) {
            const yearlyCount = number.getAttribute("data-count-yearly");
            if (yearlyCount) {
              number.innerHTML = yearlyCount;
              console.log("number",number)
              console.log("yearlyCount", yearlyCount)
              animateCounter(number, parseInt(yearlyCount, 10));
            }
          });
 
      } else {
        // Switch to monthly
        monthlyText.style.color = "#ffffff";
        yearlyText.style.color = "#9ea3bf";
        monthlyPrices.style.display = "block";
        yearlyPrices.style.display = "none";

          // animate counter
          const numbers = document.querySelectorAll<HTMLDivElement>(".data-count");
        numbers.forEach(function (number) {
            const monthlyCount = number.getAttribute("data-count-monthly");
            if (monthlyCount) {
              number.innerHTML = monthlyCount;
              console.log("number",number)
              console.log("monthlyCount", monthlyCount)
              animateCounter(number, parseInt(monthlyCount, 10));
            }
          });
      }
    }

    billSwitch && billSwitch.addEventListener("change", togglePricing);
  };