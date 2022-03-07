$(() => {
  let num1 = "";
  let num2 = "";
  let oper = "";
  let total = 0;

  const number = (num) => {
    if (num1 === "") {
      num1 = num;
    } else {
      num2 = num;
    }
    displayBtn(num);
  };

  const operator = (op) => {
    if (oper === "") {
      oper = op;
    } else {
      tot();
      oper = op;
    }
  };

  const displayBtn = (btn) => {
    $(".calc").text(btn);
  };

  const tot = () => {
    switch (oper) {
      case "+":
        total = +num1 + +num2;
        displayBtn(total);
        break;
      case "-":
        total = +num1 - +num2;
        displayBtn(total);
        break;
      case "/":
        total = +num1 / +num2;
        displayBtn(total);
        break;
      case "x":
        total = +num1 * +num2;
        displayBtn(total);
        break;
    }
  };

  $("button").on("click", (event) => {
    let btn = $(event.target).html();
    console.log(btn);
    if (btn >= "0" && btn <= "9") {
      number(btn);
    } else {
      operator(btn);
    }
  });

  const clear = () => {
    num1 = "";
    num2 = "";
    oper = "";
    total = 0;
    $(".calc").text("");
  };

  $(".content").on("click", (event) => {
    $(".calc").html();
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
  $(".equals").on("click", () => {
    tot();
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
  $(".minus-plus").on("click", (event) => {
    $(event.currentTarget).addClass("active-minusplus");
    $(event.currentTarget).siblings().removeClass("active-btn");
    $(event.currentTarget).siblings().removeClass("active-main");
    $(event.currentTarget).siblings().removeClass("active-other");
    $(event.currentTarget).siblings().removeClass("active-minusplus");
    $(event.currentTarget).siblings().removeClass("active-clear");
  });
});
