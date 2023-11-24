import styles from "./SettingsPicker.module.css";

export function SettingsPicker({
  options,
  disableChoice,
  onChange,
  inputName,
  text,
  selectedOption,
}) {
  return (
    <>
      <p className={styles.settingsText}>{text}</p>
      <div className={styles.radioGroup}>
        {options.map((option) => {
          return (
            <div key={option.id} className={styles.radioGroupItem}>
              <input
                className={styles.radioInput}
                onChange={onChange}
                id={option.id}
                type="radio"
                name={inputName}
                value={option.value}
                disabled={disableChoice}
                checked={selectedOption === option.value}
              />
              <label className={styles.radioLabel} htmlFor={option.id}>
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
