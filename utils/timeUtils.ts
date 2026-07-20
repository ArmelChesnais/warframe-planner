import { EventEmitter } from "events"

// MS BASIS
export const MS_IN_MS = 1
export const SECOND_IN_MS = 1000 * MS_IN_MS
export const MINUTE_IN_MS = SECOND_IN_MS * 60
export const HOUR_IN_MS = MINUTE_IN_MS * 60
export const DAY_IN_MS = HOUR_IN_MS * 24

// S BASIS
export const SECOND_IN_S = 1
export const MS_IN_S = SECOND_IN_S/1000
export const MINUTE_IN_S = SECOND_IN_S * 60
export const HOUR_IN_S = MINUTE_IN_S * 60
export const DAY_IN_S = HOUR_IN_S * 24

export class Timer extends EventEmitter {
  readonly duration: number
  private elapsed: number
  private lastTime: number | null
  private repeat: boolean
  private timeout: number | undefined
  constructor(durationMs:number, repeat:boolean = false) {
    super()
    this.duration = durationMs
    this.elapsed = 0
    this.lastTime = null
    this.repeat = repeat
  }
  start = () => {
    if (this.timeout) return

    this.lastTime = Date.now()
    this.timeout = window.setTimeout(this.complete, this.duration - this.elapsed)
  }
  pause = () => {
    if ( !this.timeout || !this.lastTime ) return 

    const newElapsed = this.elapsed + (Date.now() - this.lastTime)
    this.stop()
    this.elapsed = newElapsed
  }
  stop = () => {
    window.clearTimeout(this.timeout)
    this.timeout = undefined
    this.elapsed = 0
    this.lastTime = null
  }
  reset = () => {
    this.elapsed = 0
    if ( this.timeout !== undefined ) {
      window.clearTimeout(this.timeout)
      this.timeout = undefined
      this.start()
    }
  }
  private complete = () => {
    this.emit("complete")

    if ( this.repeat ) {
      this.reset()
    } else {
      this.stop()
    }
  }
}

function parseTimeString(timeString:string):number {
  // console.log("GENERAL - PARSE TIME STRING", timeString)
  if (timeString) {
    const timeArray = timeString.split(":")
    let seconds = 0
    if (timeArray.length === 3) {
      seconds += Number(timeArray[0]) * 3600
      seconds += Number(timeArray[1]) * 60
      seconds += Number(timeArray[2])
    } else if (timeArray.length === 2) {
      seconds += Number(timeArray[0]) * 60
      seconds += Number(timeArray[1])
    } else if (timeArray.length === 1) {
      seconds += Number(timeArray[0])
    }
    return seconds
  }
  return 0
}

type formatTimeUnitNumber = 'seconds'|'milliseconds'|'minutes';
type formatTimeUnitString = 'HH:mm:ss';
type formatTimeUnit = formatTimeUnitNumber|formatTimeUnitString;
type formatTimeFormat = 'HH:mm:ss'|'HHhMMmSSs'|"PT"
export function formatTime(duration: number, unit?:formatTimeUnitNumber, format?:formatTimeFormat, allowEmpty?: boolean): string;
export function formatTime(duration: string, unit?:formatTimeUnitString, format?:formatTimeFormat, allowEmpty?: boolean): string;
export function formatTime(duration: number|string, unit:formatTimeUnit = 'seconds', format:formatTimeFormat = 'HH:mm:ss', allowEmpty: boolean=false): string {

  if (typeof duration === "string") duration = parseTimeString(duration);
  // console.log("GENERAL - FORMAT TIME", duration, unit, format)
  let negative = false
  if (duration < 0) {
    negative = true
    duration = Math.abs(duration)
  }

  if (unit === "milliseconds") duration = duration / 1000
  if (unit === "minutes") duration = duration * 60
  if (duration > 0 && duration < 1) duration = 1

  const seconds = Math.floor(duration % 60)
  const minutes = Math.floor(duration / 60) % 60
  const hours = Math.floor(duration / 3600)// % 24
  // const days = Math.floor(duration / 86400)
  let result = ""
  if (format === 'HH:mm:ss') {
    result = seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`
    if (hours > 0) result = minutes < 10 ? `${hours}:0${result}` : `${hours}:${result}`
  } else if (format === 'HHhMMmSSs') {
    // result = seconds < 10 ? `${minutes}m 0${seconds}s` : `${minutes}m ${seconds}s`
    result = seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`
    if (hours > 0) result = minutes < 10 ? `${hours}h 0${minutes}m` : `${hours}h ${minutes}m`
  }

  if (negative && format !== "PT") result = "-" + result

  if (format === "PT") {
    if (seconds > 0) result = seconds + "S"
    if (minutes > 0) result = minutes + "M" + result
    if (hours > 0) result = hours + "H" + result
    // if (days > 0) result = days + "D" + result

    result = "PT" + result
    if (result === "PT") {
      if ( !allowEmpty ) {
        console.error("GENERAL - EMPTY PT", duration, unit, format)
        throw Error("EMPTY PT")
      }

      result = "PT0S"
    }
  }
  return result
}
