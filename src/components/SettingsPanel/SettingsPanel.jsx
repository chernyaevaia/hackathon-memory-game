import { SettingsPicker } from "../SettingsPicker/SettingsPicker";
import "./SettingsPanel.css";

const timeControlOptions = [
  { label: "без таймера", value: "0", id: "timer1" },
  { label: "3 минуты", value: "3", id: "timer2" },
  { label: "5 минут", value: "5", id: "timer3" },
];

const turnsControlOptions = [
  { label: "без ограничений", value: "10000000000000000", id: "turns1" },
  { label: "20 ходов", value: "20", id: "turns2" },
  { label: "40 ходов", value: "40", id: "turns3" },
];

const fieldSizeOptions = [
  { label: "4x4", value: "16", id: "field1" },
  { label: "4x5", value: "20", id: "field2" },
  { label: "6x6", value: "36", id: "field3" },
];

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
    <div className="wrapper">
      {showWelcome ? (
        <p>Добро пожаловать, {userName}!</p>
      ) : (
        <div>
          <p>Введите имя:</p>
          <div className="input-container">
            <input
              onChange={onChangeName}
              type="text"
              placeholder="Имя"
              disabled={disableChoice}
            />
            <button
              onClick={onSubmitName}
              className="nameBtn"
              disabled={disableChoice}
            >
              Отправить
            </button>
          </div>
        </div>
      )}
      <SettingsPicker
        text="Установить размер поля:"
        options={fieldSizeOptions}
        onChange={onChangeFieldSize}
        inputName="fieldSize"
        selectedOption={fieldSize}
        disableChoice={disableChoice}
      />
      <SettingsPicker
        text="Установить ограничение времени:"
        options={timeControlOptions}
        onChange={onChangeTimeControl}
        inputName="timer"
        selectedOption={timeControl}
        disableChoice={disableChoice}
      />
      <SettingsPicker
        text="Установить ограничение ходов:"
        options={turnsControlOptions}
        onChange={onChangeTurnsNumber}
        inputName="turns"
        selectedOption={turnsNumber}
        disableChoice={disableChoice}
      />
    </div>
  );
}
