import { div } from "@tensorflow/tfjs"

export const VideoPop = ({imgUrl, hrtUrl, dat}) => {
  const spo=dat.spo
  const bpm=dat.bpm
  return (
    <div className="pop-container">
      <img className="pop" src={imgUrl} alt="" />
      <p className="spo">{spo}</p>
      <p className="bpm">{bpm}</p>
      <img className="hrt" src={hrtUrl} alt="" /> 
    </div>
  )
}
