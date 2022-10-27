import IndexField from './components/IndexField'
import DetailField from './components/DetailField'
import FormField from './components/FormField'

Nova.booting((app, store) => {
  app.component('index-group-checkbox', IndexField)
  app.component('detail-group-checkbox', DetailField)
  app.component('form-group-checkbox', FormField)
})
