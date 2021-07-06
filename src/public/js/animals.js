$(document).on('click', '#next', () => {
  const nextCursor =  encodeURIComponent($("#next").attr("data-cursor"));
  console.log(nextCursor);

  $.ajax({
    type: "GET",
    url: `/animals?cursor=${nextCursor}`,
    crossDomain: true,
    success: (data) => {
      $('#searchgrid').html(data);
    },
    error: (xhr, ajaxOptions, thrownError) => {
      console.log(`xHR: ${xhr}`);
      console.log(`ajaxOption: ${ajaxOptions}`);
      console.log(`thrownError: ${thrownError}`);
    },
  });
});
