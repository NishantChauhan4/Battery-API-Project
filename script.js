const batteryLevel = document.querySelector(".batteryLevel");
const batteryCharging = document.querySelector(".batteryCharging");
const batteryChargingTime = document.querySelector(".batteryChargingTime");
const batteryDisChargingTime = document.querySelector(
  ".batteryDisChargingTime"
);
const batteryStatus = document.querySelector(".batteryStatus");

const battery = () => {
  if ("getBattery" in navigator) {
    navigator.getBattery().then((battery) => {
      function updateAllBatteryDetails() {
        updateChargingInfo();
        updateLevelChange();
        updateDischargingTime();
        updateChargingTime();
        updateBatteryStatus();
      }

      updateAllBatteryDetails();

      //Battery charging change
      battery.addEventListener("chargingchange", () => {
        updateChargingInfo();
      });

      function updateChargingInfo() {
        const chargingInfo = battery.charging ? "Yes" : "No";
        batteryCharging.innerHTML = chargingInfo;
      }

      //Battery charging time
      battery.addEventListener("chargingtimechange", () => {
        updateChargingTime();
      });

      function updateChargingTime() {
        batteryChargingTime.innerHTML = battery.chargingTime + " seconds";
      }

      //Battery discharging time
      battery.addEventListener("dischargingtimechange", () => {
        updateDischargingTime();
      });

      function updateDischargingTime() {
        batteryDisChargingTime.innerHTML = battery.dischargingTime + " seconds";
      }

      //Battery level change
      battery.addEventListener("levelchange", () => {
        updateLevelChange();
        updateBatteryStatus();
      });

      function updateLevelChange() {
        const level = battery.level * 100 + "%";
        batteryLevel.innerHTML = level;
      }

      //Battery status
      function updateBatteryStatus() {
        if (battery.level * 100 === 100) {
          batteryStatus.innerHTML = "Full charged";
        } else if (battery.level * 100 >= 90 && battery.level * 100 < 100) {
          batteryStatus.innerHTML = "Near full charge";
        } else if (battery.level * 100 < 90 && battery.level * 100 > 20) {
          batteryStatus.innerHTML = "Normal";
        } else {
          batteryStatus.innerHTML = "Low battery";
        }
      }
    });
  }
};

battery();
