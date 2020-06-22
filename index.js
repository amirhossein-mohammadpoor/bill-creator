const discountCodes = ["8as8d7a", "56gh4j6", "o2p13i1", "zxc54q5"]

increment = elemObj => {
  const currentItem = $(elemObj).closest(".item")
  const itemPrice = currentItem.find(".food-price").text().replace(",", "")
  let numberItem = +currentItem.find(".number")
    .find("span")
    .text()
  currentItem.find(".number")
    .find("span")
    .text(`${++numberItem}`)
  currentItem.find(".item-total-price")
    .find("span")
    .eq(0)
    .text(`${itemPrice * numberItem}`)
}

decrement = elemObj => {
  const currentItem = $(elemObj).closest(".item")
  const itemPrice = currentItem.find(".food-price").text().replace(",", "")
  let numberItem = +currentItem.find(".number")
    .find("span")
    .text()
  if (numberItem == 0)
    return
  currentItem.find(".number")
    .find("span")
    .text(`${--numberItem}`)
  currentItem.find(".item-total-price")
    .find("span")
    .eq(0)
    .text(`${itemPrice * numberItem}`)
}

let discountFlag = false
checkDiscountCode = () => {
  discountFlag = discountCodes.includes(
    $(".discount-code")
      .find("input")
      .val()
  )
  $(".discount-code")
    .find("input")
    .removeClass()
  if (discountFlag) {
    $(".discount-code")
      .find("input")
      .addClass("correct")
    $(".delete-discount-button").css("display", "block")
  } else {
    $(".discount-code")
      .find("input")
      .addClass("wrong")
  }
}

deleteDiscountCode = () => {
  $(".delete-discount-button").css("display", "none")
  $(".discount-code")
    .find("input")
    .val("")
    .removeClass()
    discountFlag = false
}

$("#submit").on("click", function () {
  let sum = 0
  $(".item-total-price").each(function () {
    sum = sum + +$(this).find("span").eq(0).text()
  })
  $("#total-order")
    .find("span")
    .eq(0)
    .text(`${sum}`)
  $("#service")
    .find("span")
    .eq(0)
    .text(`${(sum * 0.025) | 0}`)
  sum = sum + (sum * 0.025) | 0
  if (discountFlag) {
    $("#discount")
      .find("span")
      .eq(0)
      .text(`${(sum * 0.1) | 0}`)
    sum = sum - (sum * 0.1) | 0
  } else {
    $("#discount")
      .find("span")
      .eq(0)
      .text(`${0}`)
  }
  $("#total-price")
    .find("span")
    .eq(0)
    .text(`${sum}`)
})