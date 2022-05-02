import './App.css';
import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Spin,
  Alert
} from 'antd';
import 'antd/dist/antd.css';
import { notification } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

function App() {

  const [results, setResults] = useState(undefined);
  const [componentSize, setComponentSize] = useState('default');
  const [validation, setValidation] = useState({})
  const [timer, setTimer] = useState(false);

  const openNotification = () => {
    notification.open({
      message: 'Faltan campos por completar',
      description:
        'Para poder completar su solicitud por favor complete los campos restantes.',
      icon: < WarningOutlined style={{ color: '#108ee9' }} />,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValidation({
      ...validation,
      [name]: value
    });
  }

  const handleSelect = (val, i) => {
    setValidation({
      ...validation,
      [i]: val
    });

  }

  const handleSubmit = () => {
    const noError = Object.values(validation).some(val =>
      !val.length) && Object.values(validation).length === 10


    if (!noError) {
      openNotification()
    }
    if (noError) {
      setResults(getRandomInt(100))
      setTimer(true);
      setTimeout(() => {
        setTimer(false);
      }, 5000)
    }
  }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


  const renderForm = () => {
    return (
      <div >
        <div className="title">
          Por favor, responda las siguientes preguntas con total honestidad para poder procesar su solicitud.
        </div >

        <div className="description">
          Recuerde que todas las preguntas son obligatorias y que solo podrá llenar el formulario una sola vez.
        </div >
        <div className="form">

          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
          >
            <div className='question'>Sigue algún deporte por televisión? En su caso indique cual.</div>

            <Input className="select" name='1' onChange={(val) => handleChange(val)} />

            <div className='question'>Que gusto de helado es su favorito?.</div>

            <Input className="select" name='2' onChange={(val) => handleChange(val)} />

            <div className='question'>Es mejor Messi o Maradona</div>

            <Select className="select" onChange={(val) => handleSelect(val, 3)} >
              <Select.Option value="messi">Messi</Select.Option>
              <Select.Option value="maradona">Maradona</Select.Option>
            </Select>

            <div className='question'>Le gusta el pescado?</div>

            <Select className="select" onChange={(val) => handleSelect(val, 4)} >
              <Select.Option value="si">Si</Select.Option>
              <Select.Option value="no">No</Select.Option>
            </Select>

            <div className='question'> En general, cual de las siguientes opciones elige para desayunar?</div>
            <Select className="select" onChange={(val) => handleSelect(val, 5)}>
              <Select.Option value="cafe">Café</Select.Option>
              <Select.Option value="mate">Mate</Select.Option>
              <Select.Option value="te">Té</Select.Option>
              <Select.Option value="chocolatada">Chocolatada</Select.Option>
            </Select>

            <div className='question'>Juega habitualmente al Metegol?</div>

            <Select className="select" onChange={(val) => handleSelect(val, 6)}>
              <Select.Option value="yes">Si</Select.Option>
              <Select.Option value="nope">No</Select.Option>
            </Select>

            <div className='question'> Cual de las siguientes opciones es más de su agrado?</div>

            <Select className="select" onChange={(val) => handleSelect(val, 7)}>
              <Select.Option value="pancho">Pancho</Select.Option>
              <Select.Option value="chori">Choripan</Select.Option>
            </Select>

            <div className='question'> Elija una de las siguientes opciones</div>

            <Select className="select" onChange={(val) => handleSelect(val, 8)}>
              <Select.Option value="playa">Playa</Select.Option>
              <Select.Option value="montana">Montaña</Select.Option>
            </Select>

            <div className='question'> Que le gusta más, Pepsi o Coca?</div>

            <Select className="select" onChange={(val) => handleSelect(val, 9)}>
              <Select.Option value="pepsi">Pepsi</Select.Option>
              <Select.Option value="coca">Coca</Select.Option>
              <Select.Option value="ninguna">Ninguna</Select.Option>
            </Select>

            <div className='question'>Tiene mascotas? Indique cuantas.</div>

            <InputNumber min='0' onChange={(val) => handleSelect(val, 10)} className="select" required tooltip="This is a required field" />

            <div className="select">
              <Button onClick={handleSubmit}>Enviar</Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }

  const renderResult = () => {
    return (
      <div className='results'>
        {timer ? <>
          <Spin spinning={timer} delay={500}>
            <Alert
              message="Estamos procesando su solicitud."
              description="Por favor, aguarde un momento"
              type="info"
            />
          </Spin>
        </>
          :
          <>
            {results % 2 === 0 ?
              "Lamentamos informar que BARATMED.SA ha rechazado su solicitud de afiliación. Por cualquier consulta puede comunicarse a 11-3468-4798" : "Estimado Cliente: Dado que ha sido aprobado su test de solicitud de afiliación, nos comunicaremos con Ud. para continuar con el proceso de afiliación."
            }
          </>
        }
      </div>

    )


  }

  return (
    <div className="App">
      <div className="navbar">
        <div className="logo" onClick={() => setResults(undefined)} />
      </div>
      <div className="container">
        <div className="body">
          {results ? renderResult() : renderForm()}
        </div>
      </div>
    </div>
  );
}

export default App;
