from flask import Blueprint, jsonify
from app.services.offer_service import OfferService
from app.repositories.offer_repository import OfferRepository

bp = Blueprint("internship_offers", __name__)

@bp.route("/internships/offers", methods=["GET"])
def list_offers():
    service = OfferService(OfferRepository())
    offers = service.list_offers()
    return jsonify([o.to_dict() for o in offers]), 200

@bp.route("/internships/offers/<string:offer_id>", methods=["GET"])
def get_offer(offer_id: str):
    service = OfferService(OfferRepository())
    offer = service.get_offer(offer_id)

    if not offer:
        return jsonify({"error": "Offer not found"}), 404

    return jsonify(offer.to_dict()), 200
