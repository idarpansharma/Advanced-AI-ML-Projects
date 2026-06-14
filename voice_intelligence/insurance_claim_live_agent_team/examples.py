"""Demo prompts for ADK Web."""

BASEMENT_FLOOD_WITH_PHOTOS = """
I need to start a homeowners claim. Policyholder is Maya Singh, policy H0-44721.
Phone is 415-555-0134 and email is maya@example.com. On March 18, 2026 our
finished basement in Denver flooded after the sump pump failed during heavy rain.
There is soaked carpet, damaged drywall, and water around stored boxes. We took
photos and a short video before moving anything. I do not have repair receipts or
contractor estimates yet. I think damage is around $18,000.
"""

CAR_ACCIDENT_WITH_INJURIES = """
Auto claim for Jordan Lee, policy AUTO-90210. Text me at 503-555-0199.
On April 2, 2026 at 6:40 PM near SE 12th and Hawthorne in Portland, another car
ran a red light and hit my driver's side. My passenger has neck pain and went to
urgent care. Police came and gave report number PDX-24-8811. I have photos,
the other driver's plate, and the tow receipt. Car may be totaled, estimate unknown.
"""

STOLEN_LAPTOP_NO_POLICE_REPORT = """
I want to file for a stolen laptop. I'm Priya Shah, renter policy RNT-3008,
priya@example.com. It was taken from my backpack at a coffee shop in Austin on
February 9, 2026 around 3 PM. MacBook Pro and charger, maybe $2,400. I have the
purchase receipt and serial number but I have not filed a police report yet.
"""

TRAVEL_CANCELLATION_STORM = """
Travel claim: Alex Chen, policy TRV-7711, alex.chen@example.com, 646-555-0112.
Our flight from JFK to Reykjavik on January 14, 2026 was cancelled because of a
major winter storm and the airline could not rebook us for three days, so we
missed the prepaid glacier tour and first two hotel nights. I have airline emails,
hotel receipts, tour confirmation, and credit card statements. Total loss about
$3,200.
"""

INCOMPLETE_VAGUE_CLAIM = """
Something bad happened last week and I need insurance to pay for it. I lost a lot
of stuff and maybe there was damage at my place. I don't remember the exact date.
Please just open the claim.
"""

DEMO_PROMPTS = {
    "basement_flood_with_photos": BASEMENT_FLOOD_WITH_PHOTOS,
    "car_accident_with_injuries": CAR_ACCIDENT_WITH_INJURIES,
    "stolen_laptop_no_police_report": STOLEN_LAPTOP_NO_POLICE_REPORT,
    "travel_cancellation_storm": TRAVEL_CANCELLATION_STORM,
    "incomplete_vague_claim": INCOMPLETE_VAGUE_CLAIM,
}
