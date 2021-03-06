$(() => {
  let num1 = "";
  let num2 = "";
  let operator = "";
  let total;

  // the first number is stored in num1; the second in num2

  const numbers = (num) => {
    if (num1 === "") {
      num1 = num;
    } else {
      num2 = num;
    }
  };

  // operator clicked is stored in operator; once the second operator is clicked, the total is calculated and stored in total
  const operators = (op) => {
    if (operator === "") {
      operator = op;
    } else {
      result();
      operator = op;
    }
  };

  // after total is stored in num1, and next number clicked in num2
  const updateNums = () => {
    num1 = total;
    num2 = "";
  };

  // calculations based on the operator clicked (requires to numbers)
  const result = () => {
    switch (operator) {
      case "+":
        total = +num1 + +num2;
        total = maxTenDec(total);
        total = numberFormat(total);
        displayContent(total);
        total = turnIntoNumber(total);
        break;
      case "-":
        total = +num1 - +num2;
        total = maxTenDec(total);
        total = numberFormat(total);
        displayContent(total);
        total = turnIntoNumber(total);
        break;
      case "/":
        total = +num1 / +num2;
        total = maxTenDec(total);
        total = error(total);
        total = numberFormat(total);
        displayContent(total);
        total = turnIntoNumber(total);
        break;
      case "x":
        total = +num1 * +num2;
        total = maxTenDec(total);
        total = numberFormat(total);
        displayContent(total);
        total = turnIntoNumber(total);
        break;
    }
    updateNums();
  };

  // if divided by zero, show error
  const error = (total) => {
    if (total === Infinity) {
      return (total = "Error");
    }
  };

  // console.log(error("Infinity"));

  // calculations based on the operator clicked (requires one number)
  const otherOperators = (op) => {
    if (op === "R2") {
      total = (+num1).toFixed(2);
      total = numberFormat(total);
      displayContent(total);
      total = turnIntoNumber(total);
    } else if (op === "R0") {
      total = Math.ceil(+num1);
      total = numberFormat(total);
      displayContent(total);
      total = turnIntoNumber(total);
    } else if (op === "%") {
      total = +num1 / 100;
      total = maxTenDec(total);
      total = numberFormat(total);
      displayContent(total);
      total = turnIntoNumber(total);
    } else if (op === "x??") {
      total = (+num1) ** 2;
      total = maxTenDec(total);
      total = numberFormat(total);
      displayContent(total);
      total = turnIntoNumber(total);
    } else if (op === "???x") {
      total = (+num1) ** 0.5;
      if (isNaN(total)) {
        total = "Error";
        displayContent(total);
      } else {
        total = maxTenDec(total);
        total = numberFormat(total);
        displayContent(total);
        total = turnIntoNumber(total);
      }
    } else if (op === "+/-") {
      total = +num1 * -1;
      total = maxTenDec(total);
      total = numberFormat(total);
      displayContent(total);
      total = turnIntoNumber(total);
    }
    updateNums();
    return total;
  };

  // what gets displayed on the calculator screen
  const displayContent = (btn) => {
    $(".screen").html(btn);
  };

  // add numbers and operators to a calculation based on buttons clicked
  let value = "";
  $("button").on("click", (event) => {
    let btn = $(event.currentTarget).html();
    if (btn >= "0" && btn <= "9") {
      value += btn;
      displayContent(value);
    } else if (btn === "." && !value.includes(".")) {
      value += btn;
      displayContent(value);
    } else {
      numbers(value);
      value = "";
    }

    if (
      btn === "+" ||
      btn === "-" ||
      btn === "/" ||
      btn === "x" ||
      btn === "="
    ) {
      operators(btn);
    }

    if (
      btn === "R2" ||
      btn === "R0" ||
      btn === "%" ||
      btn === "x??" ||
      btn === "???x" ||
      btn === "+/-"
    ) {
      otherOperators(btn);
    }
  });

  // add custom number format
  const numberFormat = (num) => {
    // create array of two substrings split by '.'
    num = num.toString().split(".");
    // insert space to 4th last position of the string
    num[0] = num[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    // return the whole string
    num = num.join(".");
    // cuts the string at 16 characters
    if (num.length > 16) {
      num = num.slice(0, 16);
    }
    return num;
  };

  // turn into number after the string is formatted
  const turnIntoNumber = (num) => {
    if (num.includes(" ")) {
      num = num.replaceAll(" ", "");
      num = parseFloat(num);
      return num;
    } else {
      return num;
    }
  };

  // set max of 10 decimals after comma (but removes trailing zeros if any)
  const maxTenDec = (num) => {
    if (!Number.isInteger(num)) {
      num = parseFloat(num.toFixed(6));
    }
    return num;
  };

  // clear content and calculations
  const clear = () => {
    num1 = "";
    num2 = "";
    operator = "";
    value = "";
    total = 0;
    displayContent("");
    $(".screen").css("font-size", "3rem");
  };

  // active buttons
  $(".content").on("click", (event) => {
    $(event.currentTarget).addClass("active-btn");
    $(event.currentTarget).siblings().removeClass("active-btn");
    $(event.currentTarget).siblings().removeClass("active-main");
    $(event.currentTarget).siblings().removeClass("active-other");
    $(event.currentTarget).siblings().removeClass("active-minusplus");
    $(event.currentTarget).siblings().removeClass("active-clear");
  });
  $(".main-oper").on("click", (event) => {
    $(event.currentTarget).addClass("active-main");
    $(event.currentTarget).siblings().removeClass("active-btn");
    $(event.currentTarget).siblings().removeClass("active-main");
    $(event.currentTarget).siblings().removeClass("active-other");
    $(event.currentTarget).siblings().removeClass("active-minusplus");
    $(event.currentTarget).siblings().removeClass("active-clear");
  });
  $(".other-oper").on("click", (event) => {
    $(event.currentTarget).addClass("active-other");
    $(event.currentTarget).siblings().removeClass("active-btn");
    $(event.currentTarget).siblings().removeClass("active-main");
    $(event.currentTarget).siblings().removeClass("active-other");
    $(event.currentTarget).siblings().removeClass("active-minusplus");
    $(event.currentTarget).siblings().removeClass("active-clear");
  });
  $(".clear").on("click", (event) => {
    clear();
    $(event.currentTarget).addClass("active-clear");
    $(event.currentTarget).siblings().removeClass("active-btn");
    $(event.currentTarget).siblings().removeClass("active-main");
    $(event.currentTarget).siblings().removeClass("active-other");
    $(event.currentTarget).siblings().removeClass("active-minusplus");
  });
});
