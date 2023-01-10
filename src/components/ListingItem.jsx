import { Link } from "react-router-dom";
import bedIcon from '../assets/svg/bedIcon.svg';
import bathtubIcon from '../assets/svg/bathtubIcon.svg';

function ListingItem({ listing, id, onDelete }) {
    return (
        <li className="categoryListing">
            <Link to={ `/categoria/${listing.type}/${id}` } className='categoryListingLink'>
                <img 
                    src={ listing.imgUrls[0] } 
                    alt={ listing.name } 
                    className='categoryListingImg'
                />

                <div className="categoryListDetails" style={{ marginLeft: '1.5rem' }}>
                    <p className="categoryListingLocation">
                        { listing.location }
                    </p>

                    <p className="categoryListingName">
                        { listing.name }
                    </p>

                    <p className="categoryListingPrice">
                        R$ {listing.offer
                            ? listing.discountedPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            : listing.regularPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        {listing.type === 'rent' && ' / mês'}
                    </p>

                    <div className="categoryListingInfoDiv">
                        <img src={ bedIcon } alt="Camas" />
                        <p className="categoryListingInfoText">
                            { listing.bedrooms > 1 ? `${listing.bedrooms} Quartos` : '1 Quarto' }
                        </p>

                        <img src={ bathtubIcon } alt="Banheiros" />
                        <p className="categoryListingInfoText">
                            { listing.bathrooms > 1 ? `${listing.bathrooms} Banheiros` : '1 Banheiro' }
                        </p>
                    </div>
                </div>
            </Link>

            { onDelete && (
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="rgb(231, 76, 60)" onClick={() => onDelete(listing.id, listing.name)}>
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
            )}
        </li>
    );
}

export default ListingItem;