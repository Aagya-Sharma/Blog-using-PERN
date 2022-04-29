import "../css/Main.css"

interface EmployeeProps {
	title: string;
	desc:string;
}

function MainSection({title,desc}:EmployeeProps){
	return (
	<>
        <div className="container pt-4 pb-4">
			<div className="row">
				<div className="col-lg-6">
					<div className="card border-0 mb-4 box-shadow h-xl-300">              
            			<div className="card-body px-0 pb-0 d-flex flex-column align-items-start">
							<h2 className="h4 font-weight-bold">
							<a className="text-dark" href="./article.html">
							{title}</a>
							</h2>
							<p className="card-text">
								{desc}
							</p>
							<div>
								<small className="d-block"><a className="text-muted" href="./author.html"></a></small>
					</div>
				</div>
			</div>
		</div>				
	</div>
</div>
</>
    )
}

export default MainSection