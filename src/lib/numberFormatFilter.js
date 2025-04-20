export default {
  methods: {
    numberFormat(value) {
      if (isNaN(value)) {
        return 'Invalid number';
      }

      const formattedNumber = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return formattedNumber;
    },
  },
};