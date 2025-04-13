export function formatSelectedDate(date){
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      const formattedEST = formatter.format(date); 

      return formattedEST;
}