"""
Assign each response with a score based on the five weighted dimention. 
Admin should be able to set the weight for each dimension. The score should be calculated as follows:
"""

DEFAULT_WEIGHTS = {
    "compliance": 0.20,
    "process": 0.20,
    "communication": 0.20,
    "efficiency": 0.20,
    "outcome": 0.20
}

def calculate_score(response, weights=None):
    """
    Calculate the score for a given response based on the provided weights.
    
    Parameters:
    response (dict): A dictionary containing scores for each dimension.
    weights (dict(dimension, weight)): A dictionary containing weights for each dimension.
    
    Returns:
    float: The calculated score for the response.
    """
    if weights is None:  # when not specified, use default weights
        weights = DEFAULT_WEIGHTS

    if abs(sum(weights.values()) - 1.0) > 1e-9:  # use 1e-9 to avoid floating point precision issues
        raise ValueError("Weights must add up to 1.0")

    if set(response) != set(weights):
        raise ValueError("Response must contain all scoring dimensions")

    if any(not 0 <= score <= 100 for score in response.values()):
        raise ValueError("Dimension scores must be between 0 and 100")

    if any(weight < 0 for weight in weights.values()):
        raise ValueError("Weights cannot be negative")

    score = 0.0
    
    for dimension, weight in weights.items():
        score += response.get(dimension, 0) * weight
    return score