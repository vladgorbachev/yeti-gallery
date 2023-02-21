//@ts-nocheck

export function createBezierEasingFunction(coordinateArray: number[]) {
    if (
        !Array.isArray(coordinateArray) ||
        coordinateArray.length !== 4 ||
        !coordinateArray.every((n) => typeof n === "number")
    ) {
        throw new Error("Invalid coordinates provided");
    }

    function generateEasingFunctionName(...coordinates: number[]) {
        return `bezier_${$.makeArray(coordinates).join("_").replace(".", "p")}`;
    }

    function defineEasingFunction(name: string, curve: (t: number) => number) {
        if (typeof $["easing"] === "object") {
            $["easing"][name] = (
                x: number,
                t: number,
                b: number,
                c: number,
                d: number
            ) => {
                return c * curve(t / d) + b;
            };
        }
    }

    const easingFunctionName = generateEasingFunctionName(...coordinateArray);
    if (typeof $["easing"][easingFunctionName] !== "function") {
        const bezierCurve = (point1: number[], point2: number[]) => {
            const aCoefficients: number[] = [null, null];
            const bCoefficients: number[] = [null, null];
            const cCoefficients: number[] = [null, null];
            const bezierCoordinates = (t: number, axis: number) => {
                cCoefficients[axis] = 3 * point1[axis];
                bCoefficients[axis] =
                    3 * (point2[axis] - point1[axis]) - cCoefficients[axis];
                aCoefficients[axis] =
                    1 - cCoefficients[axis] - bCoefficients[axis];
                return (
                    t *
                    (cCoefficients[axis] +
                        t * (bCoefficients[axis] + t * aCoefficients[axis]))
                );
            };
            const xDerivative = (t: number) => {
                return (
                    cCoefficients[0] +
                    t * (2 * bCoefficients[0] + 3 * aCoefficients[0] * t)
                );
            };
            const findXForT = (t: number) => {
                let x = t;
                let i = 0;
                let z: number;
                while (++i < 14) {
                    z = bezierCoordinates(x, 0) - t;
                    if (Math.abs(z) < 1e-3) break;
                    x -= z / xDerivative(x);
                }
                return x;
            };
            return (t: number) => {
                return bezierCoordinates(findXForT(t), 1);
            };
        };
        defineEasingFunction(
            easingFunctionName,
            bezierCurve(
                [coordinateArray[0], coordinateArray[1]],
                [coordinateArray[2], coordinateArray[3]]
            )
        );
    }
    return easingFunctionName;
}
