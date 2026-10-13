function isValidDevice(dev) {
  if (dev && dev.name && dev.room && dev.powerWatts > 0) {
    return true;
  }
  return false;
}

function createDevice(list, newDev) {
  if (!isValidDevice(newDev)) return false;
  let id = "DEV_" + String(list.length + 1).padStart(3, "0");
  list.push({
    id: id,
    name: newDev.name,
    room: newDev.room,
    powerWatts: newDev.powerWatts,
    isActive: newDev.isActive !== undefined ? newDev.isActive : false
  });
  return true;
}

function readDevicesByRoom(list, roomName) {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].room.toLowerCase() === roomName.toLowerCase()) {
      result.push(list[i]);
    }
  }
  return result;
}

function updateDevice(list, id, updateData) {
  let device = null;
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      device = list[i];
      break;
    }
  }
  if (!device) return false;

  if (updateData.name !== undefined) 
    device.name = updateData.name;
  if (updateData.room !== undefined) 
    device.room = updateData.room;
  if (updateData.powerWatts !== undefined) 
    device.powerWatts = updateData.powerWatts;
  if (updateData.isActive !== undefined) 
    device.isActive = updateData.isActive;

  return true;
}

function deleteDevice(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
      return true;
    }
  }
  return false;
}

let smartHomeDevices = [];

createDevice(smartHomeDevices, { name: "Đèn phòng khách", room: "Phòng khách", powerWatts: 15, isActive: true });
createDevice(smartHomeDevices, { name: "Điều hòa", room: "Phòng ngủ", powerWatts: 1200 });
createDevice(smartHomeDevices, { name: "Quạt treo tường", room: "Phòng khách", powerWatts: 45 });

console.log(readDevicesByRoom(smartHomeDevices, "Phòng khách"));

updateDevice(smartHomeDevices, "DEV_001", { isActive: false, powerWatts: 0 });
console.log(smartHomeDevices);

deleteDevice(smartHomeDevices, "DEV_003");
console.log(smartHomeDevices);