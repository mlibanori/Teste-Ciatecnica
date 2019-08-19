@extends('layouts.default')

@section('content')

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Clientes
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-user"></i> Clientes</a></li>
        <li><a href="#">Listar</a></li>
    </ol>
</section>

<!-- Main content -->
<section class="content" ng-view>


</section>
<!-- /.content -->

@stop

@section('script')
<script type="text/javascript" src="/vendor/angular-messages.min.js"></script>
<script type="text/javascript" src="/js/app.js"></script>
@stop