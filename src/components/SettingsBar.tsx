import toolState from '@/store/toolState'
import '../styles/settings-bar.scss'

const SettingsBar = () => {
  const handleLineWidhtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toolState.setWidthLine(e.target.value)
  }

  const handleStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toolState.setStrokeColor(e.target.value)
  }

  return (
    <div className="settings-bar">
      <label htmlFor="line-width">Width of line</label>
      <input
        onChange={handleLineWidhtChange}
        style={{ margin: "0 12px" }}
        id="line-width"
        type="number"
        min={1}
        max={50}
        defaultValue={1}
      />

      <label htmlFor="stroke-color">Stroke color</label>
      <input
        onChange={handleStrokeColorChange}
        style={{ margin: "0 12px" }}
        id="stroke-color"
        type="color"
      />
    </div>
  );
}

export default SettingsBar