<template>
  <span class="p2" :endTime="endTime" :callback="callback" :endText="endText">
    <i>{{days}}天</i><i>{{hours}}</i>:<i>{{minutes}}</i>:<i>{{seconds}}</i>
<!--    .<i>{{milliseconds}}</i>-->
  </span>
</template>
<script>
// import { eventBus } from'../../utils/eventBus.js'
export default {
  data(){
    return {
      days:0,
      hours:0,
      minutes:0,
      seconds:0,
      milliseconds:0,
      pageTimer:{}
    }
  },
  props:{
    endTime:{},
    endText:{
      type : String,
      default:'已结束'
    },
    callback : {}
  },
  watch: {
    endTime () {
      this.countdowm()
    },
  },
  methods: {
    countdowm(){
      const nowTime = (new Date()).getTime()
      let self = this
      let endTime = this.endTime
      let t = endTime - nowTime
      console.log(t)
      console.log(endTime)
      console.log(nowTime)
      if(t>0){
        let day = Math.floor(t/86400000)
        let hour=Math.floor((t/3600000)%24)
        let min=Math.floor((t/60000)%60)
        let sec=Math.floor((t/1000)%60)
        let milliseconds = 9 - parseInt((t/100%10))
        hour = hour < 10 ? "0" + hour : hour
        min = min < 10 ? "0" + min : min
        sec = sec < 10 ? "0" + sec : sec
        self.days = day
        self.hours = hour
        self.minutes = min
        self.seconds = sec
        this.milliseconds = 9 - milliseconds
      }else{
        self.days = 0
        self.hours = 0
        self.minutes = 0
        self.seconds = 0
        self.milliseconds = 0
        self._callback()
      }
    },
    _callback(){
      if(this.callback && this.callback instanceof Function){
        this.callback(...this)
      }
    }
  },
  created() {
    const vm = this
  }
}
</script>
