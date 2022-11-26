import { useState } from "react";
const Converter = () => {
  const [form, setForm] = useState({
    hex: '34495e',
    rgb: '52,73,94',
    message: '',
  })

  function hexToRgb(hex) {
    if (!(/^#[A-Za-z\d]+$/.test(hex))) {
      setForm(prevForm => ({ ...prevForm, rgb: '255,0,0', message: 'Ошибка!' }));
    }

    hex = hex.slice(1, 7)
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return r + "," + g + "," + b;
  }

  const handleFormChange = ({ target }) => {
    let { name, value } = target;
    setForm(prevForm => ({ ...prevForm, [name]: value.slice(0, 7) }));

    if (value.length === 7) {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value,
        rgb: hexToRgb(value),
        message: `rgb(${hexToRgb(value)})`
      }));
    }
  }

  return (
    <form style={{ backgroundColor: `rgb(${form.rgb})` }}>
      <input type="text" id="hex" name="hex" value={form.hex} onChange={handleFormChange} />
      <label htmlFor="hex">{form.message}</label>
    </form>
  )
}

export default Converter;