import {StyleSheet} from 'react-native';

const PRIMARY = '#2F80C8';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    paddingTop: 20,
  },
  form: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 14,
    borderRadius: 24,
    elevation: 4,
  },
  upload: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderColor: '#CBD5E0',
    borderWidth: 1,
    margin: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 16,
    color: '#1B2B3A',
  },
  textarea: {
    height: 150,
    borderColor: '#CBD5E0',
    borderWidth: 1,
    margin: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 16,
    color: '#1B2B3A',
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 10,
  },
  button: {
    padding: 12,
    borderRadius: 14,
    backgroundColor: PRIMARY,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;