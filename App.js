import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  // Estados para el nombre del cliente, fecha de reserva, lista de clientes, y visibilidad del modal
  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [materia, setMateria] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [alumnos, setAlumnos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const lastId = useRef(0);

  // Estados para el datetimepicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // Función para cambiar la fecha seleccionada en el datetimepicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; // Si no se selecciona ninguna fecha, se mantiene la actual
    setShow(false); // Oculta el datetimepicker
    setFechaNacimiento(currentDate); // Establece la fecha de reserva seleccionada en el estado
  };

  // Función para mostrar el datetimepicker con el modo especificado (date o time)
  const showMode = (currentMode) => {
    setShow(true); // Muestra el datetimepicker
    setMode(currentMode); // Establece el modo del datetimepicker
  };

  // Función para mostrar el datetimepicker en modo fecha
  const showDatepicker = () => {
    showMode('date');
  };

  // Función para agregar un nuevo alumno
  const agregarAlumno = () => {
    // Genera un nuevo cliente con un ID único (incrementa el último ID generado)
    const nuevoAlumno = { id: lastId.current + 1, nombre: nombre, carnet: carnet, materia: materia, fechaNacimiento: fechaNacimiento };
    // Agrega el nuevo cliente a la lista de clientes
    setAlumnos([...alumnos, nuevoAlumno]);
    // Limpia los campos de entrada
    setNombre("");
    setCarnet("");
    setMateria("");
    setFechaNacimiento(new Date());
    // Oculta el modal de agregar cliente
    setModalVisible(false);
    lastId.current += 1;
  };

  // Función para eliminar un cliente
  const eliminarAlumno = (id) => {
    // Filtra la lista de clientes para excluir el cliente con el ID dado
    setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Botón para abrir el modal de agregar cliente */}
      <Button style={styles.botones} title="Agregar alumno" onPress={() => setModalVisible(true)} />
      {/* Modal de agregar cliente */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Campo de entrada para el nombre del cliente */}
            <TextInput
              style={styles.input}
              placeholder="Nombre del alumno"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Carnet"
              value={carnet}
              onChangeText={setCarnet}
            />
            <TextInput
              style={styles.input}
              placeholder="Materia favorita"
              value={materia}
              onChangeText={setMateria}
            />
            {/* Botón para mostrar el datetimepicker */}
            <TouchableOpacity onPress={showDatepicker}><Text>Seleccionar fecha de nacimiento</Text></TouchableOpacity>
            {/* Muestra la fecha seleccionada */}
            <Text>selected: {fechaNacimiento.toLocaleString()}</Text>
            {/* Muestra el datetimepicker si la variable show es verdadera */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
                locale='es-ES' // Establece el idioma del datetimepicker a español
              />
            )}
            {/* Botón para agregar el cliente */}
            <Button style={styles.botones} title="Registrar alumno" onPress={agregarAlumno} />
            {/* Botón para cancelar y cerrar el modal */}
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      {/* Lista de clientes */}
      <FlatList
        data={alumnos}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.alumnoItem}
          >
            {/* Muestra el ID, nombre y fecha de reserva del cliente */}
            <Text style={styles.textItem}>{item.id}</Text>
            <Text style={styles.textItem}>{item.nombre}</Text>
            <Text style={styles.textItem}>{item.carnet}</Text>
            <Text style={styles.textItem}>{item.materia}</Text>
            <Text style={styles.fecha}>
              Fecha de nacimiento: {item.fechaNacimiento.toDateString()}
            </Text>
            <Button
              color="red"
              style={styles.alumnoItem}
              title="Eliminar"
              onPress={() => eliminarAlumno(item.id)} // Utiliza una función anónima para llamar a eliminarCliente
            />

          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()} // Extrae el ID de cada cliente como clave única
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001222',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  alumnoItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 5
  },
  textItem: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fecha: {
    fontSize: 16,
  },
  botones: {
    backgroundColor: '#C8963E',
    color: '#f0f0f0',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default App;
