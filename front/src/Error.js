const Error = ({ error }) => {
  return (
    <div class="Error">
      <img src={'closed_of_geo_icon.png'} alt="no location" />
      <div>Une erreur est survenue</div>
      <p>{error}</p>
    </div>
  )
}
