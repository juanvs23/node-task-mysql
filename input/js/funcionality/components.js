

const estadoRanges= document.querySelectorAll('.estado-range') 
const rangeSliderValue=document.querySelectorAll('input.range-slider-value')


estadoRanges.forEach((estadoRange,i)=>{
    const rangeSlider=document.querySelector(`#${estadoRange.id}`)
    noUiSlider.create(rangeSlider,{
        start: [estadoRange.dataset.value],
        connect: [true, false],
        step: 1,
        range: {
          min: [0],
          max: [100]
        },
        format: wNumb({
            decimals: 0,
            thousand: '',
            suffix: ''
        })
      })
 
  rangeSlider.noUiSlider.on("update",function(values, handle) {
    rangeSliderValue[i].value = values[handle];
  })
    
})