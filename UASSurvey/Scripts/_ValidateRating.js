

const _ValidateRating = function () {
    _isCompleteRating = () => {
        const currentSequence = parseInt(document.getElementById("current_sequence_number").value);
        const ratingTypes = [
            "basic_stars_live_rating_",
            "rounded_stars_live_rating_",
            "gradient_stars_live_rating_",
            "full_stars_live_rating_"
        ];        
        for (let r = 0; r < ratingTypes.length; ++r) {
            let a = 0;
            let currentLive = document.getElementById(ratingTypes[r] + a + "_sequence_" + currentSequence);
            while (currentLive) {
                if (Object.is(currentLive.innerHTML,"") && !Object.is((currentLive.className).split(' ')[0],"hidden_part")) {
                    return false;
                }
                currentLive = document.getElementById(ratingTypes[r] + a + "_sequence_" + currentSequence);
                ++a;
            }            
        }
        return true;
    };

    return {
        isComplete: _isCompleteRating
    };
}();