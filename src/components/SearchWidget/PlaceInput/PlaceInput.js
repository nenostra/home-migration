import React, { Component } from 'react';
import Select from 'react-select';
import Fuse from 'fuse.js';
import { smoothScroll } from '../../../helpers/animatedScrollTo';

const customStyle = {
  container: (base, state) => ({
    ...base,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }),
  control: (base, state) => ({
    ...base,
    height: 48,
  }),
}

export default class PlaceIput extends Component {

  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
    this.state = {
      filteredPlaces: [],
      fuse: new Fuse(props.places, {
        shouldSort: true,
        threshold: 0.35,
        minMatchCharLength: 1,
        keys: [
          "slug",
        ]
      })
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.fuse.list.length === 0 && props.places.length > 0) {
      return {
        //filteredPlaces: props.places.slice(0, 20),  VER COMO INICIALIZAR INPUT
        fuse: new Fuse(props.places, {
          shouldSort: true,
          threshold: 0.35,
          minMatchCharLength: 1,
          keys: [
            "slug",
          ]
        })
      };
    }
    return null;
  }

  handleInputChange = (value, { action }) => {
    if (action === 'input-change') {

      // SETEAR OPTIONS INICIALES Y ESTADO CUANDO INPUT ES VACIO

      const filteredPlaces = this.state.fuse.search(value)
        .sort((a, b) => b.place.ranking_origin - a.place.ranking_origin)
        .slice(0, 20);
      this.setState({ filteredPlaces });
    }
  }

  handleMenuOpen = one => {
    smoothScroll.scrollTo(this.selectRef.current)
  }

  render() {
    const { handleChange, name } = this.props;
    return (
        <div ref={this.selectRef}>
          <Select
            instanceId={name}
            name={name}
            options={this.state.filteredPlaces}
            styles={customStyle}
            placeholder={name} // can be a custom customponent to add icon
            onChange={handleChange}
            onInputChange={this.handleInputChange}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.slug}
            filterOption={() => true}
            maxMenuHeight={800} // tamaño maximo de la lista de opciones, hay que acordarlo
            isDisabled={name === 'destino' && this.props.places.length === 0}
            menuShouldScrollIntoViewboolean={true}
            // BUSCAR COMO LIMPAR DESTINO SOBRE CAMBIO DE ORIGEN
            onMenuOpen={this.handleMenuOpen}
          />
        </div>
    );
  }
}
