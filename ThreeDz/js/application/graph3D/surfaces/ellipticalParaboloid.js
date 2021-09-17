Surface.prototype.ellipticalParaboloid = (color = '#eca61d', x = 0, y = -55, a = 10, b = 5, t = 16, h = 16) => {
    angle = 2 * Math.PI / t;
    let points = [];
    let edges = [];
    let polygones = [];

    //точки
    for (let j = 0; j < h; j++) {
        for (let i = 0; i < t; i++) {
            points.push(
                new Point(
                    x + a * j * Math.cos(angle * i),
                    y + Math.pow(j, 2),
                    b * j * Math.sin(angle * i),
                )
            )
        }
    }

    //ребра

    let current = h;
    for (let i = h; i < t * h; i++) {
        if (i % h != h - 1) {
            edges.push(new Edge(i, i + 1));
        } else {
            edges.push(new Edge(i, current));
            current += h;
        }
    }
    for (let i = 0; i < t * h - h; i++) {
        edges.push(new Edge(i, i + h));
    }

    //полигоны
    let polCurrent = 0;
    for (let i = 0; i < t * h - h; i++) {
        if (i % h != h - 1) {
            polygones.push(new Polygon([i, i + 1, i + h + 1, i + h], color));
        } else {
            polygones.push(new Polygon([i, polCurrent, i + 1, i + h], color));
            polCurrent += h;
        }
    }
    let aaaa = 0;
    let clr1 = { r: 200, g: 0, b: 0 };
    let clr2 = { r: 200, g: 0, b: 0 };
    let offset = -1;
    let third = true;
    let second = true;
    let first = true;
    for(let i = 0; i < polygones.length; i+=17){
        polygones[i].color = clr2;
    }
    for(let i = 4; i < polygones.length; i+=17){
        polygones[i].color = clr2;
        if(i >= 188 && first){
            i -= 16;
            first = false;
        }
    }
    for(let i = 8; i < polygones.length; i+=17){
        polygones[i].color = clr2;
        if(i >= 120 && second){
            i -= 16;
            second = false;
        }
    }
    for(let i = 12; i < polygones.length; i+=17){
        polygones[i].color = clr2;
        if(i >= 60 && third){
            i -= 16;
            third = false;
        } 
    }
    for(let i = 31; i < polygones.length; i+=16){
        polygones[i].color = clr2;
        polygones[i - 4].color = clr2;
        polygones[i - 8].color = clr2;
        polygones[i - 12].color = clr2;
        i--;
    }
    polygones[0].color = { r: 0, g: 200, b: 0 };;
    polygones[16].color = clr1;

    

    let dotes = [];
    for (let i = 1; i <= h; i++) {
        dotes.push(t * h - i);
    }
    polygones.push(new Polygon(dotes, color));

    return new Subject(points, edges, polygones);
}