import "./SettingsPanel.css";

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
            <input onChange={onChangeName} type="text" placeholder="Имя" disabled={disableChoice}/>
            <button onClick={onSubmitName} className="nameBtn" disabled={disableChoice}>Отправить</button>
          </div>
        </div>
      )}
      <div>
        <p>Установить размер поля:</p>
        <div className="form_radio_group">
          <div className="form_radio_group-item">
            <input
              onChange={onChangeFieldSize}
              id="radio-1.1"
              type="radio"
              name="fieldSize"
              value="16"
              checked={fieldSize === "16"}
              disabled={disableChoice}
            />
            <label className="firstBtn" htmlFor="radio-1.1">
              4x4
            </label>
          </div>
          <div className="form_radio_group-item">
            <input
              onChange={onChangeFieldSize}
              id="radio-1.2"
              type="radio"
              name="fieldSize"
              value="20"
              checked={fieldSize === "20"}
              disabled={disableChoice}
            />
            <label htmlFor="radio-1.2">4x5</label>
          </div>
          <div className="form_radio_group-item">
            <input
              onChange={onChangeFieldSize}
              id="radio-1.3"
              type="radio"
              name="fieldSize"
              value="36"
              checked={fieldSize === "36"}
              disabled={disableChoice}
            />
            <label className="lastBtn" htmlFor="radio-1.3">
              6x6
            </label>
          </div>
        </div>
      </div>

      <div>
        <p>Установить таймер игры:</p>
        <div className="form_radio_group">
          <div className="form_radio_group-item">
            <input
              onChange={onChangeTimeControl}
              id="radio-2.1"
              type="radio"
              name="timer"
              value={"0"}
              checked={timeControl === "0"}
              disabled={disableChoice}
            />
            <label className="firstBtn" htmlFor="radio-2.1">
              без ограничений
            </label>
          </div>
          <div className="form_radio_group-item">
            <input
              onChange={onChangeTimeControl}
              id="radio-2.2"
              type="radio"
              name="timer"
              value="3"
              checked={timeControl === "3"}
              disabled={disableChoice}
            />
            <label htmlFor="radio-2.2">3 минуты</label>
          </div>
          <div className="form_radio_group-item">
            <input
              onChange={onChangeTimeControl}
              id="radio-2.3"
              type="radio"
              name="timer"
              value={"5"}
              checked={timeControl === "5"}
              disabled={disableChoice}
            />
            <label className="lastBtn" htmlFor="radio-2.3">
              5 минут
            </label>
          </div>
        </div>
      </div>

      <p>Установить ограничение ходов:</p>
      <div className="form_radio_group">
        <div className="form_radio_group-item">
          <input
            onChange={onChangeTurnsNumber}
            id="radio-3.1"
            type="radio"
            name="turns"
            value="10000000000000000"
            checked={turnsNumber === "10000000000000000"}
            disabled={disableChoice}
          />
          <label className="firstBtn" htmlFor="radio-3.1">
            без ограничений
          </label>
        </div>
        <div className="form_radio_group-item">
          <input
            onChange={onChangeTurnsNumber}
            id="radio-3.2"
            type="radio"
            name="turns"
            value="20"
            checked={turnsNumber === "20"}
            disabled={disableChoice}
          />
          <label htmlFor="radio-3.2">20 ходов</label>
        </div>
        <div className="form_radio_group-item">
          <input
            onChange={onChangeTurnsNumber}
            id="radio-3.3"
            type="radio"
            name="turns"
            value="40"
            checked={turnsNumber === "40"}
            disabled={disableChoice}
          />
          <label className="lastBtn" htmlFor="radio-3.3">
            40 ходов
          </label>
        </div>
      </div>
    </div>
  );
}
