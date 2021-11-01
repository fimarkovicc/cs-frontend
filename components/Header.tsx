import Link from "next/link";

const states = [
  { url: "grad-zagreb", name: "grad zagreb" },
  { url: "pozesko-slavonska", name: "požeško-slavonska" },
  { url: "viroviticko-podravska", name: "virovitičko-podravska" },
  { url: "bjelovarsko-bilogorska", name: "bjelovarsko-bilogorska" },
  { url: "primorsko-goranska", name: "primorsko-goranska" },
  { url: "istarska", name: "istarska" },
  { url: "brodsko-posavska", name: "brodsko-posavska" },
  { url: "dubrovacko-neretvanska", name: "dubrovačko-neretvanska" },
  { url: "karlovacka", name: "karlovačka" },
  { url: "koprivnicko-krizevacka", name: "koprivničko-križevačka" },
  { url: "krapinsko-zagorska", name: "krapinsko-zagorska" },
  { url: "licko-senjska", name: "ličko-senjska" },
  { url: "medimurje", name: "međimurje" },
  { url: "osjecko-baranjska", name: "osječko-baranjska" },
  { url: "sisacko-moslavacka", name: "sisačko-moslavačka" },
  { url: "splitsko-dalmatinska", name: "splitsko-dalmatinska" },
  { url: "sibensko-kninska", name: "šibensko-kninska" },
  { url: "varazdinska", name: "varaždinska" },
  { url: "vukovarsko-srijemska", name: "vukovarsko-srijemska" },
  { url: "zadarska", name: "zadarska" },
  { url: "zagrebacka", name: "zagrebačka" },
];

export default function Header() {
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        aria-label="Fourth navbar example"
      >
        <div className="container">
          <Link href="/" passHref>
            <a className="navbar-brand">Expand at md</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="dropdownNav"
                  data-bs-toggle="dropdown"
                  aria-expanded="true"
                >
                  Županije
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownNav"
                  data-bs-popper="none"
                >
                  {states.map((state) => {
                    return (
                      <li key={state.url}>
                        <Link href={`/${state.url}`} passHref>
                          <a className="dropdown-item">{state.name}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
