
function Tag(name) {
    return {'name': name}
}

function Category(name, description) {
    return {'name': name, 'description': description}
}

// Leave these alone
var CATEGORIES = [
    Category('Airway', 'Airway, Breathing, and Ventilation'),
    Category('Cardiology', 'Cardiology and Resuscitation'),
    Category('Medical', 'Medical/OB/Gyn'),
    Category('Trauma', 'Trauma'),
    Category('Operations', 'EMS Operations')
];


// Add to these as necessary
// Removing tags will probably require questions to be reviewed
// Tags should be lowercase alpha + numbers, no spaces (use "-" instead), no special chars
var TAGS = [
    Tag('airway'),
    Tag('airway-bls'),
    Tag('airway-als'),
    Tag('airway-ett'),
    Tag('airway-king'),
    Tag('anaphylaxis'),
    Tag('anatomy'),
    Tag('assessment'),
    Tag('assessment-bls'),
    Tag('assessment-als'),
    Tag('assessment-sample'),
    Tag('assessment-opqrst'),
    Tag('assessment-apgar'),
    Tag('assessment-vitals'),
    Tag('cpr-adult'),
    Tag('cpr-peds'),
    Tag('cpr-infant'),
    Tag('c-spine'),
    Tag('cardioversoin'),
    Tag('defibrillation'),
    Tag('ekg-interpretation'),
    /** medication-specific questions */
    Tag('medications'),
    Tag('acls'),
    Tag('pals'),
    Tag('phtls'),
    Tag('pediatrics'),
    Tag('pedi-airway'),
    /* General pharmacology */
    Tag('pharmacology'),
    Tag('operations'),
    Tag('scene-safety'),
    Tag('hazmat'),
    Tag('legal'),
    Tag('communications'),
    Tag('documentation'),
];
