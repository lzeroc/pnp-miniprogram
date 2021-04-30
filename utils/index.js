const { textData, mobileData } = require('./data');
const { array_unique, array_reverse } = require('./tool');

function measuringMobile(mobile, strGender) {
    var num = mobile.substr(0, 2);
    var m = {};
    if (num == "13") {
        m[1] = '0';
    } else {
        m[1] = mobile.substr(0, 1);
    }

    for (let i = 1; i < 11; i++) {
        m[i + 1] = mobile.substr(i, 1);
    }

    var arr = [];
    var arrs = [];

    var temp = [];
    var tempVal = '';
    var tempVals = '';
    var tempXx = '';
    let index = 0;

    var character = []; // 性格
    var family = []; // 家庭
    var cause = []; // 事业
    var wealth = []; // 财富
    var health = []; // 健康

    var suggest = []; // 建议
    var nameZeroText = ''; // 最后带0的name

    for (let i in m) {
        if (m[i] == 0 || m[i] == 5) {
            if (i != 1) {
                tempVals += m[i];
            }
            continue;
        }
        if ((tempVal != '' && tempVal != m[i])) {
            let val = tempVal.toString() + m[i].toString();
            let vals = tempVals.toString() + m[i].toString();
            let j = i;
            while (true) {
                let xx = mobile.substr(j, 1);
                if (xx == '0' || xx == '5' || xx == m[i]) {
                    vals += xx;
                } else {
                    vals += tempXx;
                    tempXx = '';
                    for (let xxx in temp) {
                        if (temp[xxx].mobile == val) {
                            temp.splice(xxx, 1);
                        }
                    }
                    for (let xxxxx of mobileData) {
                        if (xxxxx.mobile_sn == val) {
                            temp[index] = {
                                "mobile": val,
                                "level": xxxxx.level,
                                "name": xxxxx.name
                            };
                            if (vals.length >= 3) {
                                temp[index].status = "加强版";
                                if (temp[index].name == '天医') {
                                    suggest.push("$156");
                                } else if (temp[index].name == '生气') {
                                    suggest.push("$157");
                                } else if (temp[index].name == '延年') {
                                    suggest.push("$158");
                                } else if (temp[index].name == '五鬼') {
                                    suggest.push("$159");
                                } else if (temp[index].name == '六煞') {
                                    suggest.push("$160");
                                } else if (temp[index].name == '祸害') {
                                    suggest.push("$161");
                                } else if (temp[index].name == '绝命') {
                                    suggest.push("$162");
                                }
                            } else {
                                temp[index].status = "";
                            }
                            temp[index].text = vals;
                            if (vals.indexOf('0') > -1) {
                                nameZeroText = temp[index].name;
                            }
                            arr.push(val)
                            arrs.push(vals)
                            break;
                        } else {
                            temp[index] = {
                                "mobile": '',
                                "level": '',
                                "name": '',
                                "status": '',
                                "text": ''
                            };
                        }
                    }
                    index++;
                    break;
                }
                j++;
            }
        }
        tempVal = m[i];
        tempVals = m[i];
    }
    var l_index;
    var num1;
    var num2;
    for (let l = 7; l >= 2; l--) {
        if (m[l] != '0' && m[l] != '5') {
            num1 = m[l];
            l_index = l;
            break;
        }
    }
    for (let ll = l_index; ll <= 11; ll++) {
        if (m[ll] != '0' && m[ll] != '5' && m[ll] != m[l_index]) {
            num2 = m[ll];
            break;
        }
    }
    var number;
    var numberName = [];
    var numberLength;
    if (num1 > 0 && num2 > 0) {
        number = num1 + num2;
        for (let x in arr) {
            if (x >= arr.indexOf(number)) {
                for (let xx of mobileData) {
                    if (xx.mobile_sn == arr[x]) {
                        numberName.push(xx.name);
                    }
                }
            }
        }
    } else {
        number = 0;
        for (let x in arr) {
            for (let xx of mobileData) {
                if (xx.mobile_sn == arr[x]) {
                    numberName.push(xx.name);
                }
            }
        }
    }
    numberName = array_unique(numberName);
    numberLength = Object.keys(numberName).length;

    var fileArray = [];

    var i8 = 1;
    for (let x of array_reverse(arr)) {
        for (let xx of mobileData) {
            if (xx.mobile_sn == x) {
                let aa = mobileData.find(temp => {
                    return temp.name == xx.name && temp.parentid == '0'
                })
                let aaa = mobileData.find(temp => {
                    return temp.level == xx.level && temp.parentid == aa.id
                })
                fileArray.push(aaa.mobile_sn);
            }
        }
        if (i8 == numberLength) {
            break;
        }
        i8++;
    }

    fileArray.sort(function (a, b) { return b - a });

    var focusOnInfo = [];
    var tempFocusOnInfo = mobileData.find(temp => {
        return temp.mobile_sn == fileArray[0];
    });
    if (tempFocusOnInfo) {
        focusOnInfo.push(tempFocusOnInfo.focus_on);
    }

    for (let x of fileArray) {
        let xx = mobileData.find(temp => {
            return temp.mobile_sn == x;
        });
        character.push(xx.character);
        family.push(xx.family);
        cause.push(xx.cause);
        wealth.push(xx.wealth);
        health.push(xx.health);
    }

    var gender_value = [];
    
    if (strGender == 0) {
        if (arr.indexOf(19) > -1 || arr.indexOf(91) > -1 || arr.indexOf(78) > -1 || arr.indexOf(87) > -1) {
            gender_value.push("$169");
        }
    } else {
        if (arr.indexOf(34) > -1 || arr.indexOf(43) > -1 || arr.indexOf(26) > -1 || arr.indexOf(62) > -1 || arr.indexOf(78) > -1 || arr.indexOf(87) > -1) {
            gender_value.push("$170");
        }
    }

    if (m[11] == 0) {
        gender_value.push("$171");
    }

    if (nameZeroText == '天医') {
        suggest.push("$163");
    } else if (nameZeroText == '生气') {
        suggest.push("$157");
    } else if (nameZeroText == '延年') {
        suggest.push("$164");
    } else if (nameZeroText == '五鬼') {
        suggest.push("$165");
    } else if (nameZeroText == '六煞') {
        suggest.push("$166");
    } else if (nameZeroText == '祸害') {
        suggest.push("$167");
    } else if (nameZeroText == '绝命') {
        suggest.push("$168");
    }

    suggest = array_unique(suggest)
    focusOnInfo = array_unique(focusOnInfo)
    gender_value = array_unique(gender_value)
    character = array_unique(character)
    family = array_unique(family)
    cause = array_unique(cause)
    wealth = array_unique(wealth)
    health = array_unique(health)

    var summaryText = '';
    for (let x in focusOnInfo) {
        if (summaryText == '') {
            summaryText += textData[focusOnInfo[x]]
        } else {
            summaryText += '。' + textData[focusOnInfo[x]]
        }
    }
    for (let x in gender_value) {
        if (summaryText == '') {
            summaryText += textData[gender_value[x]]
        } else {
            summaryText += '。' + textData[gender_value[x]]
        }
    }

    var characterText = '';
    for (let x in character) {
        if (characterText == '') {
            characterText += textData[character[x]]
        } else {
            characterText += '。' + textData[character[x]]
        }
    }

    var familyText = '';
    for (let x in family) {
        if (familyText == '') {
            familyText += textData[family[x]]
        } else {
            familyText += '。' + textData[family[x]]
        }
    }

    var causeText = '';
    for (let x in cause) {
        if (causeText == '') {
            causeText += textData[cause[x]]
        } else {
            causeText += '。' + textData[cause[x]]
        }
    }

    var wealthText = '';
    for (let x in wealth) {
        if (wealthText == '') {
            wealthText += textData[wealth[x]]
        } else {
            wealthText += '。' + textData[wealth[x]]
        }
    }

    var healthText = '';
    for (let x in health) {
        if (healthText == '') {
            healthText += textData[health[x]]
        } else {
            healthText += '。' + textData[health[x]]
        }
    }

    var suggestText = '';
    for (let x in suggest) {
        if (suggestText == '') {
            suggestText += textData[suggest[x]]
        } else {
            suggestText += '。' + textData[suggest[x]]
        }
    }

    return {
      suggest: suggestText,
      summary: summaryText,
      character: characterText,
      family: familyText,
      cause: causeText,
      wealth: wealthText,
      health: healthText,
      analyze: temp
    }
}

module.exports = {
  measuringMobile,
};
