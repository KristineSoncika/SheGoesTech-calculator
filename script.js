$(() => {
  let num1 = "";
  let num2 = "";
  let operator = "";
  let total = 0;

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
    num1 = total.toString();
    num2 = "";
  };

  // calculations based on the operator clicked (requires to numbers)
  const result = () => {
    switch (operator) {
      case "+":
        total = +num1 + +num2;
        total = maxTenDec(total);
        displayContent(total);
        break;
      case "-":
        total = +num1 - +num2;
        total = maxTenDec(total);
        displayContent(total);
        break;
      case "/":
        total = +num1 / +num2;
        total = maxTenDec(total);
        displayContent(total);
        break;
      case "x":
        total = +num1 * +num2;
        total = maxTenDec(total);
        displayContent(total);
        break;
    }
    updateNums();
  };

  // calculations based on the operator clicked (requires one number)
  const otherOperators = (op) => {
    if (op === "R2") {
      total = parseInt((+num1).toFixed(2));
      displayContent(total);
    } else if (op === "R0") {
      total = Math.ceil(+num1);
      displayContent(total);
    } else if (op === "%") {
      total = +num1 / 100;
      total = maxTenDec(total);
      displayContent(total);
    } else if (op === "x²") {
      total = (+num1) ** 2;
      total = maxTenDec(total);
      displayContent(total);
    } else if (op === "√x") {
      total = (+num1) ** 0.5;
      total = maxTenDec(total);
      displayContent(total);
    } else if (op === "+/-") {
      total = +num1 * -1;
      total = maxTenDec(total);
      displayContent(total);
    }
    updateNums();
    return total;
  };

  // what gets displayed on the calculator screen
  const displayContent = (btn) => {
    $(".screen").html(btn);
  };

  // adds numbers and operators to a calculation based on buttons clicked
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
      btn === "x²" ||
      btn === "√x" ||
      btn === "+/-"
    ) {
      otherOperators(btn);
    }
  });

  // clear content and calculations
  const clear = () => {
    num1 = "";
    num2 = "";
    operator = "";
    value = "";
    total = 0;
    displayContent("");
  };

  // sets max of 10 decimals after comma (but removes trailing zeros if any)
  const maxTenDec = (num) => {
    if (!Number.isInteger(num)) {
      num = parseFloat(num.toFixed(10));
    }
    if ((!Number.isInteger(num) && num > 10) || num < -10) {
      $(".screen").css("font-size", "3.3rem");
    }
    if ((!Number.isInteger(num) && num > 100) || num < -100) {
      $(".screen").css("font-size", "3.1rem");
    }
    if ((!Number.isInteger(num) && num > 1000) || num < -1000) {
      $(".screen").css("font-size", "2.9rem");
    }
    if ((!Number.isInteger(num) && num > 10000) || num < -10000) {
      $(".screen").css("font-size", "2.7rem");
    }
    if ((!Number.isInteger(num) && num > 100000) || num < -100000) {
      num = parseFloat(num.toFixed(9));
      $(".screen").css("font-size", "2.5rem");
    }
    return num;
  };

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
