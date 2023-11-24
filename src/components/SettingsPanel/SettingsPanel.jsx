import { SettingsPicker } from "../SettingsPicker/SettingsPicker";
import styles from "./SettingsPanel.module.css";
import { FieldSizeOptions, TimeControlOptions, TurnsControlOptions } from "../../utils";


export default function SettingsPanel({
  onChangeTimeControl,
  onChangeFieldSize,
  timeControl,
  disableChoice,
  fieldSize,
  userName,
  onChangeName,
  onSubmitName,
  showWelcome,
  onChangeTurnsNumber,
  turnsNumber,
}) {
  return (
    <div className={styles.wrapper}>
      {showWelcome ? (
        <p>Добро пожаловать, {userName}!</p>
      ) : (
        <div>
          <p>Введите имя:</p>
          <div className={styles.inputWraper}>
            <input
            className={styles.nameInput}
              onChange={onChangeName}
              type="text"
              placeholder="Имя"
              disabled={disableChoice}
            />
            <button
              onClick={onSubmitName}
              className={styles.sendBtn}
              disabled={disableChoice || !userName.trim()}
            >
              Отправить
            </button>
          </div>
        </div>
      )}
      <SettingsPicker
        text="Установить размер поля:"
        options={FieldSizeOptions}
        onChange={onChangeFieldSize}
        inputName="fieldSize"
        selectedOption={fieldSize}
        disableChoice={disableChoice}
      />
      <SettingsPicker
        text="Установить ограничение времени:"
        options={TimeControlOptions}
        onChange={onChangeTimeControl}
        inputName="timer"
        selectedOption={timeControl}
        disableChoice={disableChoice}
      />
      <SettingsPicker
        text="Установить ограничение ходов:"
        options={TurnsControlOptions}
        onChange={onChangeTurnsNumber}
        inputName="turns"
        selectedOption={turnsNumber}
        disableChoice={disableChoice}
      />
    </div>
  );
}
