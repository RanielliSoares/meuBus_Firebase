import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
  
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F516A',
    backgroundColor: '#E2F0F9',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    textAlign: 'center',
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 6,
    color: '#444',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    borderRadius: 8,
    paddingHorizontal: 16,
    width: '30%',
    minWidth: 90,
    alignItems: 'center',
  },
  cardHora: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F516A',
  },
  cardRota: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default styles;
