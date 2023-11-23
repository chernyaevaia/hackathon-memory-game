import "./SettingsPicker.css";

export function SettingsPicker({
  options,
  disableChoice,
  onChange,
  inputName,
  text,
  selectedOption,
}) {
  return (
    <div>
      <p>{text}</p>
      <div className="form_radio_group">
        {options.map((option) => {
          return (
            <div key={option.id} className="form_radio_group-item">
              <input
                onChange={onChange}
                id={option.id}
                type="radio"
                name={inputName}
                value={option.value}
                disabled={disableChoice}
                checked={selectedOption === option.value}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
