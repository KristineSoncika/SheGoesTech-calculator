$(() => {
  let num1 = "";
  let num2 = "";
  let operator = "";
  let total;

  // the first number is stored in num1; the second in num2

  const numbers = (num) => {
    if (num1 === "") {
      num1 = num;
      console.log("num1: " + num1);
    } else {
      num2 = num;
      console.log("num2: " + num2);
    }
  };

  // operator clicked is stored in operator; once the second operator is clicked, the total is calculated and stored in total
  const operators = (op) => {
    if (operator === "") {
      operator = op;
      console.log(operator);
    } else {
      result();
      operator = op;
      console.log(operator);
    }
  };

  // after total is stored in num1, and next number clicked in num2
  const updateNums = () => {
    num1 = total;
    num2 = "";
  };

  // calculations
  const result = () => {
    switch (operator) {
      case "+":
        total = +num1 + +num2;
        displayContent(total);
        break;
      case "-":
        total = +num1 - +num2;
        displayContent(total);
        break;
      case "/":
        total = +num1 / +num2;
        displayContent(total);
        break;
      case "x":
        total = +num1 * +num2;
        displayContent(total);
        break;
    }
    console.log(total);
    console.log("num11: " + num1);

    updateNums();
    console.log(total);
    console.log("num111: " + num1);
  };

  // what gets displayed on the calculator screen
  const displayContent = (btn) => {
    $(".screen").html(btn);
  };

  //
  let value = "";
  $("button").on("click", (event) => {
    let btn = $(event.currentTarget).html();
    if (btn >= "0" && btn <= "9") {
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
  });

  const equals = () => {
    num1 = "";
    operator = "";
    value = "";
    total = 0;
  };

  // clear content and calculations
  const clear = () => {
    num1 = "";
    num2 = "";
    operator = "";
    value = "";
    total = 0;
    displayContent("");
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
